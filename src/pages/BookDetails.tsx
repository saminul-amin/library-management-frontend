import { useParams, useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  User,
  Tag,
  Copy,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  ArrowLeft,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useGetBookByIdQuery, useDeleteBookMutation } from "@/redux/api";
import type { IBook } from "@/types/book";

export default function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: bookData,
    isLoading,
    error,
  } = useGetBookByIdQuery(id!, {
    skip: !id,
  });
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

  const book: IBook = bookData?.data;

  const handleDelete = async () => {
    if (!book) return;

    try {
      await deleteBook(book._id).unwrap();
      navigate("/");
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-8 text-center">
              <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Book Not Found
              </h2>
              <p className="text-gray-600 mb-6">
                {error?.toString() ||
                  "The book you're looking for doesn't exist."}
              </p>
              <Button
                onClick={() => navigate("/")}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Books
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const isAvailable = book.copies > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate("/books")}
            className="border-purple-200 hover:border-purple-300 hover:bg-purple-50 text-purple-700 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Books
          </Button>
        </div>

        {/* Main Book Details Card */}
        <Card className="bg-white shadow-xl border-0 rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 h-32"></div>

          <CardHeader className="relative -mt-16 pb-6">
            <div className="flex items-start gap-6">
              <div className="p-6 bg-white rounded-xl shadow-lg border-4 border-white">
                <BookOpen className="w-12 h-12 text-purple-500" />
              </div>
              <div className="flex-1 pt-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl font-bold text-gray-800 mb-2">
                      {book.title}
                    </CardTitle>
                    <p className="text-lg text-gray-600 mb-4">
                      by {book.author}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {isAvailable ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Available
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200">
                        <XCircle className="w-3 h-3 mr-1" />
                        Out of Stock
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            {/* Book Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                  <User className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Author</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {book.author}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-pink-50 rounded-lg">
                  <Tag className="w-5 h-5 text-pink-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Genre</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {book.genre}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-lg">
                  <Copy className="w-5 h-5 text-indigo-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Available Copies
                    </p>
                    <p className="text-lg font-semibold text-gray-800">
                      {book.copies} {book.copies === 1 ? "copy" : "copies"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Added to Library
                    </p>
                    <p className="text-lg font-semibold text-gray-800">
                      {new Date(
                        book.createdAt || Date.now()
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description section (if available) */}
            {book.description && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Description
                </h3>
                <div className="p-6 bg-gray-50 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">
                    {book.description}
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200">
              <Button
                className={`flex-1 min-w-48 w-full transition-all duration-200 ${
                  isAvailable
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-md hover:shadow-lg cursor-pointer"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!isAvailable}
                size="lg"
                onClick={() => navigate(`/borrow/${book._id}`)}
              >
                <BookOpen className="w-5 h-5 mr-2" />
                {isAvailable ? "Borrow This Book" : "Currently Unavailable"}
              </Button>

              <Link to={`/edit-book/${book._id}`}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-purple-200 hover:border-purple-300 hover:bg-purple-50 text-purple-700 transition-all duration-200 cursor-pointer"
                >
                  <Edit className="w-5 h-5 mr-2" />
                  Edit Book
                </Button>
              </Link>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-red-200 hover:border-red-300 hover:bg-red-50 text-red-700 transition-all cursor-pointer duration-200"
                  >
                    <Trash2 className="w-5 h-5 mr-2" />
                    Delete Book
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-500 curp" />
                      Delete Book
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{book.title}" by{" "}
                      {book.author}? This action cannot be undone and will
                      permanently remove this book from the library.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer hover:bg-gray-200">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="bg-red-500 hover:bg-red-800 text-white disabled:opacity-50 cursor-pointer"
                    >
                      {isDeleting ? "Deleting..." : "Delete Book"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

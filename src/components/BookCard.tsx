import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  Edit,
  BookOpen,
  User,
  Tag,
  Copy,
  CheckCircle,
  XCircle,
  Trash2,
  Eye,
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
import type { IBook } from "@/types/book";
import { useDeleteBookMutation } from "@/redux/api";

interface BookCardProps {
  book: IBook;
}

export default function BookCard({ book }: BookCardProps) {
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();
  const navigate = useNavigate();

  const isAvailable = book.copies > 0;

  const handleDelete = async () => {
    try {
      await deleteBook(book._id).unwrap();
    } catch (error) {
      console.error("Failed to delete book:", error);
      // You might want to show an error toast here
    }
  };

  return (
    <Card className="group relative overflow-hidden bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 rounded-xl">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Availability badge */}
      <div className="absolute top-3 right-3 z-10">
        {isAvailable ? (
          <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
            <CheckCircle className="w-3 h-3" />
            Available
          </div>
        ) : (
          <div className="flex items-center gap-1 bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
            <XCircle className="w-3 h-3" />
            Out of Stock
          </div>
        )}
      </div>

      <CardHeader className="pb-3 relative pt-2">
        <div className="flex items-start gap-3">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-md group-hover:shadow-lg transition-shadow">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-bold text-gray-800 line-clamp-2 group-hover:text-purple-700 transition-colors">
              {book.title}
            </CardTitle>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-3">
        {/* Book details */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600">
            <User className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium">{book.author}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <Tag className="w-4 h-4 text-pink-500" />
            <span className="text-sm">{book.genre}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <Copy className="w-4 h-4 text-indigo-500" />
            <span className="text-sm font-medium">
              {book.copies} {book.copies === 1 ? "copy" : "copies"}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-2 pt-4 relative z-20">
          {/* First row - Details and Edit */}
          <div className="flex gap-2">
            <Link to={`/books/${book._id}`} className="flex-1">
              <Button
                variant="outline"
                className="w-full border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50 text-indigo-700 transition-all duration-200 cursor-pointer"
              >
                <Eye className="w-4 h-4 mr-2" />
                Details
              </Button>
            </Link>

            <Link to={`/edit-book/${book._id}`} className="flex-1">
              <Button
                variant="outline"
                className="w-full border-purple-200 hover:border-purple-300 hover:bg-purple-50 text-purple-700 transition-all duration-200 cursor-pointer"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </Link>
          </div>

          {/* Second row - Borrow and Delete */}
          <div className="flex gap-2">
            <Button
              className={`flex-1 w-full transition-all duration-200 ${
                isAvailable
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-md hover:shadow-lg cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!isAvailable}
              onClick={() => navigate(`/borrow/${book._id}`)}
            >
              <BookOpen className={`w-4 h-4 ${isAvailable && "mr-2"}`} />
              {isAvailable ? "Borrow" : "Unavailable"}
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="flex-1 border-red-200 hover:border-red-300 hover:bg-red-50 text-red-700 transition-all duration-200 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
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
                    className="bg-red-500 hover:bg-red-800 text-white cursor-pointer"
                  >
                    {isDeleting ? "Deleting..." : "Delete Book"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

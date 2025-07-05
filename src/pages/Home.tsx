import { useGetBooksQuery } from "@/redux/api";
import BookCard from "@/components/BookCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus, BookOpen, Sparkles } from "lucide-react";
import type { IBook } from "@/types/book";

export default function Home() {
  const { data: books, isLoading } = useGetBooksQuery();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Library Collection
            </h1>
            <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
          </div>
          <p className="text-gray-600 text-lg mb-6">
            Discover and manage your favorite books
          </p>
          <Link to="/create-book">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
              <Plus className="w-5 h-5 mr-2" />
              Add New Book
            </Button>
          </Link>
        </div>

        {/* Content Section */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mb-4"></div>
            <p className="text-gray-600 text-lg">
              Loading your amazing books...
            </p>
          </div>
        ) : (
          <>
            {books?.data?.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-12 h-12 text-purple-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                  No books yet!
                </h3>
                <p className="text-gray-500 mb-6">
                  Start building your library by adding your first book
                </p>
                <Link to="/create-book">
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Book
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {books?.data?.map((book: IBook) => (
                  <BookCard key={book._id} book={book} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

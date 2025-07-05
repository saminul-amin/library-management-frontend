import { useParams, useNavigate } from "react-router-dom";
import { useBorrowBookMutation, useGetBooksQuery } from "@/redux/api";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen,
  Calendar,
  Hash,
  User,
  Tag,
  Copy,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import type { IBook } from "@/types/book";
import { toast } from "react-toastify";

export default function BorrowBook() {
  const { bookId } = useParams();
  const { data: books } = useGetBooksQuery();
  const book = books?.data?.find((b: IBook) => b._id === bookId);
  const [borrowBook] = useBorrowBookMutation();
  const navigate = useNavigate();

  const [form, setForm] = useState({ quantity: 1, dueDate: "" });

  const handleChange = (e: any) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!bookId) return;
    await borrowBook({
      book: bookId,
      quantity: Number(form.quantity),
      dueDate: form.dueDate,
    });
    toast("Book borrowed successfully!!");
    navigate("/borrow-summary");
  };

  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center">
        <Card className="max-w-md mx-4 text-center">
          <CardContent className="p-8">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Book Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              The book you're looking for doesn't exist.
            </p>
            <Button
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-purple-500 to-pink-500"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Library
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="border-purple-200 hover:bg-purple-50 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Borrow Book
            </h1>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Book Details Card */}
          <Card className="bg-white shadow-xl border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Book Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-purple-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Title</p>
                    <p className="font-semibold text-gray-800">{book.title}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-pink-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Author</p>
                    <p className="font-semibold text-gray-800">{book.author}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Tag className="w-5 h-5 text-indigo-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Genre</p>
                    <p className="font-semibold text-gray-800">{book.genre}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Copy className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Available Copies</p>
                    <p className="font-semibold text-gray-800">{book.copies}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Available for borrowing</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Borrow Form Card */}
          <Card className="bg-white shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Borrow Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Hash className="w-4 h-4" />
                    Quantity
                  </label>
                  <Input
                    name="quantity"
                    type="number"
                    min={1}
                    max={book.copies}
                    value={form.quantity}
                    onChange={handleChange}
                    className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    placeholder="Enter quantity"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Maximum: {book.copies} copies available
                  </p>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4" />
                    Due Date
                  </label>
                  <Input
                    name="dueDate"
                    type="date"
                    value={form.dueDate}
                    onChange={handleChange}
                    className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    min={new Date().toISOString().split("T")[0]}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Select when you plan to return the book
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button
                  onClick={handleSubmit}
                  disabled={!form.dueDate || form.quantity < 1}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Confirm Borrow
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

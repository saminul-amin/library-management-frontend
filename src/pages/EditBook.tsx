import { useParams, useNavigate } from "react-router-dom";
import { useGetBooksQuery, useUpdateBookMutation } from "@/redux/api";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  BookOpenCheck,
  ArrowLeft,
  Sparkles,
  Save,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { Genre, IBook } from "@/types/book";

export default function EditBook() {
  const { id } = useParams();
  const { data: books } = useGetBooksQuery();
  const book = books?.data?.find((b: IBook) => b._id === id);
  const [updateBook] = useUpdateBookMutation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "FICTION" as Genre,
    isbn: "",
    description: "",
    copies: 1,
  });

  useEffect(() => {
    if (book) {
      setForm({
        title: book.title,
        author: book.author,
        genre: book.genre,
        isbn: book.isbn,
        description: book.description || "",
        copies: book.copies,
      });
    }
  }, [book]);

  const handleChange = (e: any) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!id) return;
    await updateBook({ id, body: { ...form, genre: form.genre as Genre } });
    navigate("/");
  };

  if (!book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
        <div className="p-6 max-w-2xl mx-auto">
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-12 h-12 text-red-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              Book Not Found
            </h3>
            <p className="text-gray-500 mb-6">
              The book you're looking for doesn't exist in your library
            </p>
            <Link to="/">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white cursor-pointer">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Library
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="p-6 max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg">
              <BookOpenCheck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Edit Book
            </h1>
            <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
          </div>
          <p className="text-gray-600 text-lg mb-6">
            Update your book details and keep your collection current
          </p>
          <Link to="/">
            <Button
              variant="outline"
              className="mb-6 border-purple-300 text-purple-600 hover:bg-purple-50 hover:border-purple-400 transition-all duration-300 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Library
            </Button>
          </Link>
        </div>

        {/* Form Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Book Title
                </label>
                <Input
                  name="title"
                  placeholder="Enter book title"
                  value={form.title}
                  onChange={handleChange}
                  className="border-gray-200 focus:border-purple-400 focus:ring-purple-400 rounded-xl h-12"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Author
                </label>
                <Input
                  name="author"
                  placeholder="Enter author name"
                  value={form.author}
                  onChange={handleChange}
                  className="border-gray-200 focus:border-purple-400 focus:ring-purple-400 rounded-xl h-12"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Genre
                </label>
                <Select
                  value={form.genre}
                  onValueChange={(value) =>
                    setForm({ ...form, genre: value as Genre })
                  }
                >
                  <SelectTrigger className="border-gray-200 focus:border-purple-400 focus:ring-purple-400 rounded-xl h-12">
                    <SelectValue placeholder="Select Genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "FICTION",
                      "NON_FICTION",
                      "SCIENCE",
                      "HISTORY",
                      "BIOGRAPHY",
                      "FANTASY",
                    ].map((g) => (
                      <SelectItem key={g} value={g}>
                        {g.replace("_", " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Number of Copies
                </label>
                <Input
                  name="copies"
                  type="number"
                  min={1}
                  placeholder="1"
                  value={form.copies}
                  onChange={handleChange}
                  className="border-gray-200 focus:border-purple-400 focus:ring-purple-400 rounded-xl h-12"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ISBN
              </label>
              <Input
                name="isbn"
                placeholder="Enter ISBN number"
                value={form.isbn}
                onChange={handleChange}
                className="border-gray-200 focus:border-purple-400 focus:ring-purple-400 rounded-xl h-12"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <Textarea
                name="description"
                placeholder="Enter book description..."
                value={form.description}
                onChange={handleChange}
                rows={4}
                className="border-gray-200 focus:border-purple-400 focus:ring-purple-400 rounded-xl resize-none"
              />
            </div>

            <div className="pt-4">
              <Button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                <Save className="w-5 h-5 mr-2" />
                Update Book
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

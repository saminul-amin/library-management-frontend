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
import type { Genre } from "@/types/book";


export default function EditBook() {
  const { id } = useParams();
  const { data: books } = useGetBooksQuery();
  const book = books?.data?.find((b) => b._id === id);
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

  if (!book) return <p className="p-4">Book not found</p>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">Edit Book</h1>
      <Input
        name="title"
        value={form.title}
        onChange={handleChange}
        className="mb-2"
      />
      <Input
        name="author"
        value={form.author}
        onChange={handleChange}
        className="mb-2"
      />
      <Select
        onValueChange={(value) => setForm({ ...form, genre: value as Genre })}
      >
        <SelectTrigger className="mb-2">
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
              {g}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        name="isbn"
        value={form.isbn}
        onChange={handleChange}
        className="mb-2"
      />
      <Textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        className="mb-2"
      />
      <Input
        name="copies"
        type="number"
        min={1}
        value={form.copies}
        onChange={handleChange}
        className="mb-2"
      />
      <Button onClick={handleSubmit}>Update</Button>
    </div>
  );
}

import { useCreateBookMutation } from "@/redux/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Genre } from "@/types/book";

export default function CreateBook() {
  const navigate = useNavigate();
  const [createBook] = useCreateBookMutation();
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "FICTION",
    isbn: "",
    description: "",
    copies: 1,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await createBook({
      ...form,
      genre: form.genre as Genre,
      copies: Number(form.copies),
      available: true,
    });
    navigate("/books");
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">Add a New Book</h1>
      <Input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="mb-2"
      />
      <Input
        name="author"
        placeholder="Author"
        value={form.author}
        onChange={handleChange}
        className="mb-2"
      />
      <Select
        onValueChange={(value) => setForm({ ...form, genre: value as any })}
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
        placeholder="ISBN"
        value={form.isbn}
        onChange={handleChange}
        className="mb-2"
      />
      <Textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="mb-2"
      />
      <Input
        name="copies"
        type="number"
        min={1}
        placeholder="Copies"
        value={form.copies}
        onChange={handleChange}
        className="mb-2"
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
}

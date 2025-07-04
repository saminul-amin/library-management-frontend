import { useParams, useNavigate } from "react-router-dom";
import { useBorrowBookMutation, useGetBooksQuery } from "@/redux/api";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function BorrowBook() {
  const { bookId } = useParams();
  const { data: books } = useGetBooksQuery();
  const book = books?.data?.find((b) => b._id === bookId);
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
    navigate("/borrow-summary");
  };

  if (!book) return <p className="p-4">Book not found</p>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Borrow: {book.title}</h2>
      <p className="mb-2 text-sm text-gray-500">
        Available Copies: {book.copies}
      </p>
      <Input
        name="quantity"
        type="number"
        min={1}
        max={book.copies}
        value={form.quantity}
        onChange={handleChange}
        className="mb-2"
      />
      <Input
        name="dueDate"
        type="date"
        value={form.dueDate}
        onChange={handleChange}
        className="mb-2"
      />
      <Button onClick={handleSubmit}>Borrow</Button>
    </div>
  );
}

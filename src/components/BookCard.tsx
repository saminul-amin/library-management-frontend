import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import type { IBook } from "@/types/book";

export default function BookCard({ book }: { book: IBook }) {
  return (
    <Card className="w-full max-w-sm shadow-lg">
      <CardHeader>
        <CardTitle>{book.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm">Author: {book.author}</p>
        <p className="text-sm">Genre: {book.genre}</p>
        <p className="text-sm">Copies: {book.copies}</p>
        <p
          className={`text-sm font-medium ${
            book.copies !== 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {book.copies !== 0 ? "Available" : "Unavailable"}
        </p>
        <div className="flex gap-2 mt-4">
          <Link to={`/edit-book/${book._id}`}>
            <Button>Edit</Button>
          </Link>
          <Link to={`/borrow/${book._id}`}>
            <Button variant="secondary">Borrow</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

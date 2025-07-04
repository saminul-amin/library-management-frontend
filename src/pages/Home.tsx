import { useGetBooksQuery } from "@/redux/api";
import BookCard from "@/components/BookCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import type { IBook } from "@/types/book";

export default function Home() {
  const { data: books, isLoading } = useGetBooksQuery();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Books</h1>
        <Link to="/create-book">
          <Button>Add Book</Button>
        </Link>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {books?.data?.map((book: IBook) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}

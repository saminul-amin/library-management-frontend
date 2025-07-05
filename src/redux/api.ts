import type { IBook } from "@/types/book";
import type {
  IBorrow,
  IBorrowFormInput,
  IBorrowSummaryItem,
} from "@/types/borrow";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
  tagTypes: ["Book", "Borrow"],
  endpoints: (builder) => ({
    getBooks: builder.query<IBook[], void>({
      query: () => "books",
      providesTags: ["Book"],
    }),
    getBookById: builder.query<IBook, string>({
      query: (id) => `books/${id}`,
      providesTags: (result, error, id) => [{ type: "Book", id }],
    }),
    createBook: builder.mutation<IBook, Partial<IBook>>({
      query: (body) => ({ url: "books", method: "POST", body }),
      invalidatesTags: ["Book"],
    }),
    updateBook: builder.mutation<IBook, { id: string; body: Partial<IBook> }>({
      query: ({ id, body }) => ({ url: `books/${id}`, method: "PUT", body }),
      invalidatesTags: ["Book"],
    }),
    deleteBook: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({ url: `books/${id}`, method: "DELETE" }),
      invalidatesTags: ["Book"],
    }),
    borrowBook: builder.mutation<IBorrow, IBorrowFormInput>({
      query: (body) => ({ url: "borrow", method: "POST", body }),
      invalidatesTags: ["Book", "Borrow"],
    }),
    getBorrowSummary: builder.query<IBorrowSummaryItem[], void>({
      query: () => "borrow",
      providesTags: ["Borrow"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
} = api;

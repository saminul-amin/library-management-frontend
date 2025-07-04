import { useGetBorrowSummaryQuery } from "@/redux/api";

export default function BorrowSummary() {
  const { data, isLoading } = useGetBorrowSummaryQuery();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Borrow Summary</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="border p-2 text-left">Title</th>
                <th className="border p-2 text-left">ISBN</th>
                <th className="border p-2 text-left">Total Borrowed</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, idx) => (
                <tr key={idx}>
                  <td className="border p-2">{item.book.title}</td>
                  <td className="border p-2">{item.book.isbn}</td>
                  <td className="border p-2">{item.totalQuantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

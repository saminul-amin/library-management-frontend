import { Link, NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Books" },
  { to: "/create-book", label: "Add Book" },
  { to: "/borrow-summary", label: "Borrow Summary" },
];

export default function Navbar() {
  return (
    <nav className="bg-gray-500 shadow px-4 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-indigo-600">
        Library Management
      </Link>
      <div className="flex gap-4">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              cn(
                "font-medium hover:underline text-gray-700",
                isActive && "text-indigo-600 underline"
              )
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

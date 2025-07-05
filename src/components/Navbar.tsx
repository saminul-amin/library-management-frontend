import { Link, NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Library, BookOpen, Plus, FileText, Sparkles } from "lucide-react";

const links = [
  { to: "/", label: "Books", icon: BookOpen },
  { to: "/create-book", label: "Add Book", icon: Plus },
  { to: "/borrow-summary", label: "Borrow Summary", icon: FileText },
];

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group transition-all duration-300 hover:scale-105"
          >
            <div className="relative">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-md group-hover:shadow-lg transition-shadow">
                <Library className="w-6 h-6 text-white" />
              </div>
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Library
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Management</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-gray-50",
                      isActive
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                        : "text-gray-700 hover:text-purple-600"
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={cn(
                          "w-4 h-4",
                          isActive ? "text-white" : "text-gray-500"
                        )}
                      />
                      <span className="hidden sm:inline">{link.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

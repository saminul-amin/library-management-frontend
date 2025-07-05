import { Heart, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 border-t border-purple-100">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Decorative elements */}
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
            <div className="w-8 h-px bg-gradient-to-r from-purple-300 to-pink-300"></div>
            <Heart className="w-4 h-4 text-pink-400 animate-pulse" />
            <div className="w-8 h-px bg-gradient-to-r from-pink-300 to-purple-300"></div>
            <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
          </div>

          {/* Copyright text */}
          <p className="text-sm text-gray-600 font-medium">
            © {new Date().getFullYear()} Library Management System
          </p>

          {/* Subtitle */}
          <p className="text-xs text-gray-500 max-w-md text-center">
            Made with <Heart className="inline w-3 h-3 text-pink-500 mx-1" />
            for book lovers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}

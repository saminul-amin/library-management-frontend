# 📚 Library Management System

> A clean and responsive frontend for managing books, built with modern tools — because reading is still cool, even when you're debugging.

---

## Overview

This project is the frontend of a **Minimal Library Management System**, developed using **React**, **TypeScript**, **Redux Toolkit Query (RTK Query)**, and **Tailwind CSS**.

The application allows users to:
- View available books
- Add, update, or delete books
- Borrow books
- See a summary of borrowed books

All operations are performed **without authentication** and are powered by a simple, modular RESTful backend API.

---

## Features

### Book Management
- View all books in a card layout
- Add new books via a form
- Edit existing book details (in a separate page)
- Delete books with confirmation
- Book availability is auto-updated based on copy count

### Borrowing
- Borrow a selected book (with due date and quantity)
- Prevents borrowing more than available copies
- Marks book unavailable when copies hit zero

### Borrow Summary
- Aggregated summary showing total quantity borrowed per book
- Uses MongoDB aggregation pipeline behind the scenes

### Navigation
- **Navbar** with links to:
  - All Books
  - Add Book
  - Borrow Summary
- **Footer** with credits (you deserve it)

---

## Tech Stack

| Layer        | Tech                          |
|--------------|-------------------------------|
| Framework    | React + TypeScript            |
| State/API    | Redux Toolkit + RTK Query     |
| Styling      | Tailwind CSS + shadcn/ui      |
| Backend API  | Express.js + MongoDB (with Mongoose) |

---

## Development Notes

- **RTK Query** handles all data fetching and caching
- **TypeScript** used throughout with properly defined interfaces (`IBook`, `IBorrow`, etc.)
- **Tailwind CSS** + **shadcn/ui** used for consistent UI
- Code is modular, readable, and organized

---

## Contact

- **Developer:** Md. Saminul Amin
- **Email:** [saminul.amin@gmail.com](mailto:saminul.amin@gmail.com)
- **GitHub:** [@saminul-amin](https://github.com/saminul-amin)
- **LinkedIn:** [Md. Saminul Amin](https://www.linkedin.com/in/md-saminul-amin-91605730a/)

---

## 🏁 Final Words

> This project demonstrates practical usage of modern React architecture — combining RTK Query, type-safe components, and clean UI design — to solve a simple, real-world problem.

Thanks for reading (or at least skimming until the end). Hope you enjoy the code as much as I enjoyed building and debugging it. ✌️

---




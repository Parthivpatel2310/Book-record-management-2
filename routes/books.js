const express = require("express");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

const router = express.Router();

//get all books
router.get("/", (req, res) => {
  res.status(200).json({ success: true, data: books });
});

//get books by id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const book = books.find((each) => each.id === id);

  if (!book)
    return res.status(404).json({ success: false, message: "Book not found" });
    return res.status(200).json({ success: true, data: book });
});

//get issued books
router.get("/issued/by-user", (req, res) => {
  const usersWithIssuedBook = users.filter((each) => {
    if (each.issuedBook) return each;
  });
  const issuedBooks = [];

  usersWithIssuedBook.forEach((each) => {
    const book = books.find((book) => book.id === each.issuedBook);

    book.issuedBy = each.name;
    book.issuedDate = each.issuedDate;
    book.returnDate = each.returnDate;

    issuedBooks.push(book);
  });
  if (issuedBooks.length === 0)
    return res.status(404).json({ success: false, message: "No booke has been issued" });
    return res.status(200).json({ success: true, data: issuedBooks });
});

//add book
router.post("/", (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(404).json({
      success: false,
      message: "Insert book Data",
    });
  }

  const book = books.find((each) => each.id === data.id);

  if (book) {
    return res.status(404).json({
      success: false,
      message: "Book already exists with the same Id",
    });
  }

  const allBooks = [...books, data];

  return res.status(200).json({
    success: true,
    data: allBooks,
  });
});

//delete books
  router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((each) => each.id === id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "book to be deleted is not found",
    });
  }
  const index = books.indexOf(book);
  books.splice(index, 1);

  return res.status(200).json({ success: true, data: books });
});

//update books
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const book = books.find((each) => each.id === id);

  if (!book) {
    return res.status(400).json({
      success: false,
      message: "Book not found with that particular Id",
    });
  }
  const UpdatedData = books.map((each) => {
    if (each.id === id) {
      return { ...each, ...data };
    }
    return each;
  });
  return res.status(200).json({
    success: true,
    data: UpdatedData,
  });
});

module.exports = router;

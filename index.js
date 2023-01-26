const express = require("express");
const {users} = require("./data/users.json");

// import routes
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");

const app = express();
const PORT = 2310;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is running succesfully",
  })
});

// http://localhost:2310/users/
app.use("/users", usersRouter);
app.use("/books", booksRouter);

app.get("*", (req, res) => {
  res.status(404).json({
    message: "This route doesn't exist",
  });
});
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

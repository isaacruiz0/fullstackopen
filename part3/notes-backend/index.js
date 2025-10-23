const express = require("express");
const app = express();

const notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];
app.get("/", (req, res) => {
  res.send(
    "<h1>Bruh how did browser know to render HTML? </h1><a href=\'/api/notes\' >/notes</a>",
  );
});
app.get("/apii/notes", (req, res) => {
  res.json(notes);
});
const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

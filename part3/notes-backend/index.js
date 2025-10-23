const express = require("express");
const app = express();

let notes = [
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
app.get("/api/notes", (req, res) => {
  res.json(notes);
});
app.get("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  const note = notes.find((note) => note.id === id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});
app.delete("/api.notes/:id", (req, res) => {
  const id = request.params.id;
  notes = notes.filter((n) => n.id !== id);
});
const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

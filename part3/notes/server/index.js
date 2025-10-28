import express from "express";
import cors from "cors";
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
const generateId = () => {
  notes.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0;
  return String(maxId + 1);
};
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send(
    "<h1>Bruh how did browser know to render HTML? </h1><a href=\'/api/notes\' >/notes</a>",
  );
});
app.get("/api/notes", (req, res) => {
  console.info("requst processed");
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
app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  notes = notes.filter((n) => n.id !== id);
  if (notes) {
    res.json(notes);
    res.status(200).end();
  } else {
    res.status(404).end();
  }
});
app.post("/api/notes", (req, res) => {
  const body = req.body;
  if (!body.content) {
    return res.status(400).json({
      error: "content missing",
    });
  }
  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  };
  notes = note.concat(note);
  res.json(note);
});
app.put("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  const { content, important } = req.body;
  const updatedNote = { content, important, id };
  notes = notes.map((note) => (note.id === id ? updatedNote : note));
  res.status(200).json(updatedNote);
});
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

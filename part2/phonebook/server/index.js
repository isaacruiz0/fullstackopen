import express from "express";
import morgan from "morgan";

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const app = express();
const PORT = 3000;

app.use(express.json());
morgan.token("body", function getId(req) {
  return JSON.stringify(req.body);
});
app.use(morgan(":method :url :body"));

const checkDuplicateName = (persons, name) => {
  const alreadyExistsPerson = persons.filter((person) => person.name === name);
  return alreadyExistsPerson.length > 0;
};
app.get("/api/persons", (req, res) => {
  res.json(persons);
});
app.get("/api/persons/:params_id", (req, res) => {
  const { params_id } = req.params;
  const selectedPerson = persons.find((person) => person.id === params_id);
  if (selectedPerson) res.json(selectedPerson);
  else res.status(404).end();
});
app.get("/info", (req, res) => {
  const personsCount = persons.length;
  res.send(`<p>Phonebook has info for ${personsCount}</p></b><p>${Date()}</p>`);
});
app.delete("/api/persons/:params_id", (req, res) => {
  const { params_id } = req.params;
  persons = persons.filter((person) => person.id !== params_id);
  res.json(persons);
});
app.post("/api/persons", (req, res) => {
  const newPerson = req.body;
  if (!newPerson.name || !newPerson.number) {
    res.status(500);
    res.render("error", { error: "Missing name or number" });
  }

  const isDuplicateName = checkDuplicateName(persons, newPerson.name);
  if (isDuplicateName) {
    res.status(500).json({ message: "Name already exists" });
  }

  newPerson.id = String(Math.round(Math.random() * 9999));
  persons = persons.concat(newPerson);
  res.json(persons);
});

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log("we live");
});

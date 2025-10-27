import express from "express";

const persons = [
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

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:params_id", (req, res) => {
  const { params_id } = req.params;
  const selectedPerson = persons.find((person) => person.id === params_id);
  res.json(selectedPerson);
});

app.get("/info", (req, res) => {
  const personsCount = persons.length;
  res.send(`<p>Phonebook has info for ${personsCount}</p></b><p>${Date()}</p>`);
});

app.listen(PORT, () => {
  console.log("we live");
});

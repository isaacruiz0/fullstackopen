import { useState, useEffect } from "react";

const MatchedPersons = ({ match, persons }) => {
  return (
    <>
      {persons
        .filter((person) => person.name.startsWith(match))
        .map((person) => {
          return (
            <p key={person.id}>
              {person.name} {person.number}
            </p>
          );
        })}
    </>
  );
};
const PersonForm = ({ handleSubmit }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  return (
    <form onSubmit={(e) => handleSubmit(e, newName, newNumber)}>
      <div>
        name:{" "}
        <input
          value={newName}
          onChange={(e) => setNewName(e.currentTarget.value)}
        />
      </div>
      <div>
        number:{" "}
        <input
          value={newNumber}
          onChange={(e) => setNewNumber(e.currentTarget.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
const App = () => {
  const [persons, setPersons] = useState([]);
  const [match, setMatch] = useState("");
  const [error, setError] = useState("");

  const initPersons = () => {
    fetch("http://localhost:3001/persons")
      .then((r) => r.json())
      .then((r) => setPersons(r))
      .catch((error) => setError(error));
  };
  useEffect(initPersons, []);
  const handleSubmit = (e, newName, newNumber) => {
    e.preventDefault();
    const nameAlreadyExists = checkDuplicateName(persons, newName);
    if (nameAlreadyExists) {
      alert(`ERROR: ${newName} already exists`);
    } else {
      setPersons(
        persons.concat({
          name: newName,
          number: newNumber,
        }),
      );
    }
  };
  const checkDuplicateName = (persons, name) => {
    const alreadyExistsPerson = persons.filter(
      (person) => person.name === name,
    );
    return alreadyExistsPerson.length > 0;
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <label>Filter as shown: </label>
        <input
          value={match}
          onChange={(e) => setMatch(e.currentTarget.value)}
        />
      </div>
      <h2>Add new</h2>
      <PersonForm handleSubmit={handleSubmit} />
      <h2>Numbers</h2>
      <MatchedPersons match={match} persons={persons} />
    </div>
  );
};

export default App;

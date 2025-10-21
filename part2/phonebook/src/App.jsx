import { useState, useEffect } from "react";
import personService from "./services/persons.js";
import Notification from "./components/Notification.jsx";

const MatchedPersons = ({ match, persons, handleDelete }) => {
  return (
    <>
      {persons
        .filter((person) => person.name.startsWith(match))
        .map((person) => {
          return (
            <div key={person.id}>
              <p>
                {person.name} {person.number}
              </p>
              <button onClick={() => handleDelete(person.id)}>delete</button>
            </div>
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
  // Notification State
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationState, setNotificationState] = useState(null);

  const initPersons = () => {
    personService.getAll().then((r) => setPersons(r));
  };
  useEffect(initPersons, []);
  const handleSubmit = (e, newName, newNumber) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    const nameAlreadyExists = checkDuplicateName(persons, newName);
    if (nameAlreadyExists) {
      if (
        !window.confirm(
          `${newName} already exists, replace the old number with the new one?`,
        )
      )
        return;
      const { id } = persons.find((person) => person.name === newName);
      personService
        .update(id, newPerson)
        .then((updatedPerson) => {
          const updatedPersons = persons.map((person) => {
            if (person.id === updatedPerson.id) {
              return updatedPerson;
            }
            return person;
          });

          setPersons(updatedPersons);
          setNotificationMessage(
            `Successfully added/updated ${newName} to phonebook`,
          );
          setNotificationState("success");
          setTimeout(() => setNotificationMessage(null), 4000);
        })
        .catch(() => {
          setNotificationMessage(
            `Information of ${newName} has already been removed from server`,
          );
          setNotificationState("error");
        });
      return;
    }
    personService.create(newPerson).then((createdPerson) => {
      setNotificationMessage(
        `Successfully added/updated ${newName} to phonebook`,
      );
      setNotificationState("success");
      setTimeout(() => setNotificationMessage(null), 4000);
      setPersons(persons.concat(createdPerson));
    });
  };
  const checkDuplicateName = (persons, name) => {
    const alreadyExistsPerson = persons.filter(
      (person) => person.name === name,
    );
    return alreadyExistsPerson.length > 0;
  };
  const handleDelete = (id) => {
    const { name } = persons.find((person) => person.id === id);
    window.confirm(`Are you sure you want to delete ${name}`) &&
      personService.remove(id).then((deletedPerson) => {
        setPersons(persons.filter((person) => person.id !== deletedPerson.id));
      });
  };
  return (
    <div>
      {notificationMessage && (
        <Notification message={notificationMessage} state={notificationState} />
      )}
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
      <MatchedPersons
        match={match}
        persons={persons}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;

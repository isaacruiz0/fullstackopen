import Note from "./components/Note";
import { useState, useEffect } from "react";
import noteService from "./services/notes.js";
import Notification from "./components/Notification.jsx";
import Footer from "./components/Footer.jsx";

const App = () => {
  const [showAll, setShowAll] = useState(true);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("add note");
  const [errorMessage, setErrorMessage] = useState(false);

  const initNotes = () => {
    noteService.getAll().then((notes) => setNotes(notes));
  };
  useEffect(initNotes, []);
  const handleAddNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };

    noteService.create(noteObject).then((newlyAddedNote) => {
      setNotes(notes.concat(newlyAddedNote));
      setNewNote("");
    });
  };
  const handleNoteChange = (event) => setNewNote(event.currentTarget.value);
  const notesToShow = showAll ? notes : notes.filter((note) => note.important);
  const toggleNoteImportance = (id) => {
    const note = notes.find((note) => note.id === id);
    const changedNote = { ...note, important: !note.important };
    noteService
      .update(id, changedNote)
      .then((updatedNote) => {
        console.log(updatedNote);

        setNotes(notes.map((note) => (note.id === id ? updatedNote : note)));
      })
      .catch(() => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`,
        );
        setTimeout(() => setErrorMessage(null), 4000);
      });
  };
  return (
    <div>
      <h1>Notes</h1>
      {errorMessage && <Notification message={errorMessage} />}
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleNoteImportance(note.id)}
          />
        ))}
      </ul>
      <button onClick={() => setShowAll(!showAll)}>
        {showAll ? "important" : "all"}
      </button>
      <form onSubmit={handleAddNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;

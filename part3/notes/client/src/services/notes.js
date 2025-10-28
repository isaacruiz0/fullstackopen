const baseUrl = "http://localhost:4000/api/notes";

const getAll = () => {
  const notes = fetch(`${baseUrl}`).then((r) => r.json());
  return notes;
};
const update = (id, newNote) => {
  const updatedNote = fetch(`${baseUrl}/${id}`, {
    method: "PUT",
    headers: {
      type: "application/json",
    },
    body: JSON.stringify(newNote),
  }).then((res) => res.json());
  return updatedNote;
};

const create = (noteObject) => {
  const newlyAddedNote = fetch(baseUrl, {
    method: "POST",
    body: JSON.stringify(noteObject),
    headers: {
      type: "application/json",
    },
  }).then((res) => res.json());
  return newlyAddedNote;
};

export default { getAll, update, create };

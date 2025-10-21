const baseUrl = "http://localhost:3001/persons";
const getAll = () => {
  const persons = fetch(baseUrl).then((r) => r.json());
  return persons;
};
const create = (newPerson) => {
  const createdPerson = fetch(baseUrl, {
    method: "POST",
    type: "application/json",
    body: JSON.stringify(newPerson),
  }).then((res) => res.json());
  return createdPerson;
};
const remove = (id) => {
  const url = `http://localhost:3001/persons/${id}`;
  const deletedPerson = fetch(url, {
    method: "DELETE",
  }).then((r) => r.json());
  return deletedPerson;
};

export default { getAll, create, remove };

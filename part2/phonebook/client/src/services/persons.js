const baseUrl = "http://localhost:3000/";
const getAll = () => {
  const persons = fetch(baseUrl).then((r) => r.json());
  return persons;
};
const create = (newPerson) => {
  const createdPerson = fetch(baseUrl, {
    method: "POST",
    type: "application/json",
    body: JSON.stringify(newPerson),
};
const remove = (id) => {
  const url = `${baseUrl}${id}`;
  const deletedPerson = fetch(url, {
    method: "DELETE",
  }).then((r) => r.json());
  return deletedPerson;
};
const update = (id, newPerson) => {
  const url = `${baseUrl}${id}`;
  const updatedPerson = fetch(url, {
    method: "PUT",
    type: "application/json",
    body: JSON.stringify(newPerson),
  }).then((r) => r.json());

  return updatedPerson;
};

export default { getAll, create, remove, update };

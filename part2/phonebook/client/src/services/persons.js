const baseUrl = "http://localhost:3000/";
const getAll = () => {
  const persons = fetch(baseUrl).then((r) => r.json());
  return persons;
};
const create = (newPerson) => {
  const createdPersonPromise = fetch(baseUrl, {
    method: "POST",
    type: "application/json",
    body: JSON.stringify(newPerson),
  });
  return createdPersonPromise;
};
const remove = (id) => {
  const url = `${baseUrl}${id}`;
  const deletedPersonPromise = fetch(url, {
    method: "DELETE",
  }).then((r) => r.json());
  return deletedPersonPromise;
};
const update = (id, newPerson) => {
  const url = `${baseUrl}${id}`;
  const updatedPersonPromise = fetch(url, {
    method: "PUT",
    type: "application/json",
    body: JSON.stringify(newPerson),
  }).then((r) => r.json());

  return updatedPersonPromise;
};

export default { getAll, create, remove, update };

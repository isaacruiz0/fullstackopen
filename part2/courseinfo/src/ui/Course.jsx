const Total = ({ total }) => <b>Total of exercises {total}</b>;
const Header = ({ name }) => <h1>{name}</h1>;
const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);
const Content = ({ parts }) => (
  <>
    {parts.map((p) => (
      <Part key={p.id} part={p} />
    ))}
  </>
);
const Course = ({ course }) => {
  const { parts, name } = course;
  const totalExercises = parts.reduce((accum, currVal) => {
    return accum + currVal.exercises;
  }, 0);
  return (
    <>
      <Header name={name} />
      <Content parts={parts} />
      <Total total={totalExercises} />
    </>
  );
};

export default Course;

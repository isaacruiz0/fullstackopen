const Header = ({course}) => (
  <h1>{course}</h1>
)
const Part = ({part, exercises}) => (
  <p>{part} {exercises}</p>
)
const Content = () => {
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  return  (
    <>
      <Part part={part1} exercise={exercises1} />
      <Part part={part2} exercise={exercises2} />
      <Part part={part3} exercise={exercises3}/>
    </>
  )
}
const Total = ( { a, b, c } ) => (
  <p>{ a + b + c}</p>
)
const App = () => {
  const course = 'Half Stack application development'
  const exercises1 = 10
  const exercises2 = 7
  const exercises3 = 14

  return (
    <>
      <Header course={course} />
      <Content />
      <Total a={exercises1} b={exercises2} c={exercises3} />
    </>
  )
}

export default App
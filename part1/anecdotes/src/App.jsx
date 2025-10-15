import { useState } from 'react'

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  'The only way to go fast, is to go well.'
]
const initialAnecdoteVotes = anecdotes.map( () => 0 );

const App = () => {
  const [selected, setSelected] = useState(0);
  const [anecdoteVotes, setAnecdoteVotes] = useState(initialAnecdoteVotes);
  const getRandomIndex = () => Math.floor((Math.random()*anecdotes.length));
  const handleVote = () => {
    const oldVote = anecdoteVotes[selected];
    const newVote = oldVote + 1;
    const newAnecdoteVotes = [ ...anecdoteVotes ];
    newAnecdoteVotes[selected] = newVote;
    setAnecdoteVotes(newAnecdoteVotes);
  }

  const mostVoteNum = Math.max(...anecdoteVotes);
  const mostVotedQuote = anecdotes[anecdoteVotes.indexOf(mostVoteNum)]
  return (
    <div>
      <h1>{anecdotes[selected]}</h1>
      <h1>votes: {anecdoteVotes[selected]}</h1>
      <button onClick={() => setSelected(getRandomIndex())} >Random Quote</button>
      <button onClick={handleVote} >Vote</button>

      <h1>Anecdote with most votes</h1>
      <p>{mostVotedQuote}</p>
      <p>has {mostVoteNum} votes</p>
    </div>
  )
}

export default App
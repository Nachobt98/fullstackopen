import { useState } from 'react'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    { text: 'If it hurts, do it more often.', votes: 1 },
    { text: 'Adding manpower to a late software project makes it later!', votes: 4 },
    { text: 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 6 },
    { text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes: 3 },
    { text: 'Premature optimization is the root of all evil.', votes: 7 },
    { text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes: 4 },
    { text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.', votes: 9 },
    { text: 'The only way to go fast, is to go well.', votes: 8 }
  ])
  const [selected, setSelected] = useState(0)

  return (
    <>
      <h1>
        Anecdote of the day
      </h1>
      <div>
      {anecdotes[selected].text}
      <p>Has {anecdotes[selected].votes} votes</p>
      </div>
      <button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}>
      next anecdote
      </button>
      <button onClick={() => {
        setAnecdotes(currentAnecdotes =>
          currentAnecdotes.map((anecdote, index) =>
            index === selected
              ? { ...anecdote, votes: anecdote.votes + 1 }
              : anecdote
          )
        )
      }}>
      vote
      </button>

       <h1>
        Anecdote with most votes
      </h1>
      <div>
        {anecdotes.reduce((max, anecdote) => anecdote.votes > max.votes ? anecdote : max, anecdotes[0]).text}
        <p>Has {anecdotes.reduce((max, anecdote) => anecdote.votes > max.votes ? anecdote : max, anecdotes[0]).votes} votes</p>
      </div>
    </>
  )
}

export default App
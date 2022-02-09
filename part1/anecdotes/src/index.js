import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const DisplayRandomQuote = ({anecdotes, selected, points}) => {
  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
    </div>
  )
}

const DisplayMostVotedQuote = ({anecdotes, points}) => {
  const index = points.indexOf(Math.max(...points))

  if(points[index] === 0){
    return(
      <div>
        <p>There is no votes for yet</p>
      </div>
    )
  }
  
  return (
    <div>
      <p>{anecdotes[index]}</p>
      <p>has {points[index]} votes</p>
    </div>
  )
}

const Button = ({onClick ,text}) => <button onClick={onClick}>{text}</button>


const App = () => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(6).fill(0))

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const handleNewQuoteClick = () => {
    let randomQuote = Math.floor(Math.random()*anecdotes.length)
    setSelected(randomQuote);
  }

  const handleVoteClick = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  return(
    <div>
    <DisplayRandomQuote anecdotes={anecdotes} selected={selected} points={points}/>
    <Button onClick={handleNewQuoteClick} text="New Quote" />
    <Button onClick={handleVoteClick} text="Vote" />
    <DisplayMostVotedQuote anecdotes={anecdotes} points={points} />
    </div>
  )
  
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
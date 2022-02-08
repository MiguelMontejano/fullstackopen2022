import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = () => {
 return(
  <h1>Feedback Giveaway</h1>
 ) 
}

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Statistic = ({text, value}) => {
  if(text === "Positive"){
    return(
      <tr>
      <td>{text}:</td> 
      <td>{value}%</td>
      </tr>
    )
  }

  return(
    <tr>
    <td>{text}:</td> 
    <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad, allClicks}) => {
  if(allClicks === 0){
    return(
      <div>
        <p>No feedback given at this moment</p>
      </div>
    )
  }

  let average = (good - bad) / allClicks;
  //if(isNaN(average)) average = 0

  let positivePercentage = (good/allClicks) * 100
  //if(isNaN(positivePercentage)) positivePercentage = 0
  
  return(
    <div>
      <h2>Statistics:</h2>
      <table>
        <tbody>
          <Statistic text="Good" value={good} />
          <Statistic text="Neutral" value={neutral} />
          <Statistic text="Bad" value={bad} />
          <Statistic text="Total Clicks" value={allClicks} />
          <Statistic text="Average" value={average} />
          <Statistic text="Positive" value={positivePercentage} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(allClicks + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(allClicks + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(allClicks + 1)
  }

  return (
    <div>
      <Title/>
      <Button onClick={handleGoodClick} text="Good"/>
      <Button onClick={handleNeutralClick} text="Neutral"/>
      <Button onClick={handleBadClick} text="Bad"/>
      <Statistics good={good} neutral={neutral} bad={bad} allClicks={allClicks}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)

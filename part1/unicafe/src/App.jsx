import { useState } from 'react'

const StatisticLine = ({ text, value }) => {
  return (
      <p>{text}: {value}</p>
  )
}
const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = (props) => {
  const { good, neutral, bad } = props
  const all = good + neutral + bad

  if (all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={all === 0 ? 0 : (good - bad) / all} />
      <StatisticLine text="positive" value={all === 0 ? 0 : (good / all) * 100 + " %"} />
    </div>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
    <h1>
      give feedback
    </h1>

    <Button text="good" handleClick={() => setGood(good + 1)} />
    <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
    <Button text="bad" handleClick={() => setBad(bad + 1)} />

     <h1>
      statistics
    </h1>

    <Statistics good={good} neutral={neutral} bad={bad} />
    </div>

  )
}

export default App
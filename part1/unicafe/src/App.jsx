import { useState } from "react"
const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}
const StatisticLine = ({text, value}) => (<p>{text} {value}</p>);
const Statistics = ({goodCount, neutralCount, badCount}) => {
  const total = goodCount + neutralCount + badCount;
  const positivePercentage = (goodCount/total)*100;
  const positive = `${positivePercentage ? positivePercentage : 0}%`;

  const goodValue = goodCount*1;
  const neutralValue = neutralCount*0;
  const badValue = badCount*-1;
  const average = (goodValue + neutralValue + badValue) / total
  
  if ( total === 0 ) {
    return (
     <>
      <h1>statistics</h1>
      <p>no feedback</p>
     </>
    )
  }

  return (
    <>
      <h1>statistics</h1>
      <StatisticLine text={'good'} value={goodCount} />
      <StatisticLine text={'neutral'} value={neutralCount} />
      <StatisticLine text={'bad'} value={badCount} />
      <StatisticLine text={'all'} value={total} />
      <StatisticLine text={'average'} value={average ? average : 0} />
      <StatisticLine text={'positive'} value={positive ? positive: 0} />
    </>
  )
}
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const App = () => {
  const [goodCount, setGoodCount] = useState(0)
  const [neutralCount, setNeutralCount] = useState(0)
  const [badCount, setBadCount] = useState(0)
  return (
    <div>
      <h1>feedback</h1>
      <Button onClick={() => setGoodCount( goodCount + 1 )} text={'good'}></Button>
      <Button onClick={() => setNeutralCount( neutralCount + 1 )} text={'neutral'}></Button>
      <Button onClick={() => setBadCount( badCount + 1 )} text={'bad'}></Button>
      <Statistics goodCount={goodCount} neutralCount={neutralCount} badCount={badCount} />
    </div>
  )
}
export default App
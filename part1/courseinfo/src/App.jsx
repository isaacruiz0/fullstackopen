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

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [total, setTotal] = useState(0);
  const [allClicks, setAll] = useState([])


  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const newLeft = left + 1;
    setLeft(newLeft)
    setTotal(newLeft + right);
  }

  const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    const newRight = right + 1;
    setRight(newRight);
    setTotal(left + newRight);
  }

  return (
    <div>
      {left}
      <Button onClick={handleLeftClick} text={'left'}/>
      <Button onClick={handleRightClick} text={'right'}/>
      {right}
      <p>{allClicks.join(' ')}</p>
      <p>total: {total}</p>
      <History allClicks={allClicks} />
    </div>
  )
}
export default App
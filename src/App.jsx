import { useState } from 'react'
import Die from './Die'
import './style.css'
import { nanoid } from 'nanoid';
import ReactConfetti from 'react-confetti';

function App() {
  const [ dice, setDice ] = useState(allNewDice());

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      const randomNum = Math.floor(Math.random() * 6) + 1;
      newDice.push({ 
        value: randomNum, 
        freeze: false,
        id: nanoid()
      });
    }
    return newDice;
  }

  function handleDieClick(i) {
    const newDice = dice.slice();
    newDice[i].freeze = !newDice[i].freeze;
    setDice(newDice);
  }

  function rollDice() {
    const newDice = dice.slice();
    newDice.forEach(die => {
      if (!die.freeze) {
        die.value = Math.floor(Math.random() * 6) + 1;
      } 
    })
    setDice(newDice);
  }

  function restartGame() {
    setDice(allNewDice());
  }

  const status = checkGameEnd();

  function checkGameEnd() {
    const diceValues = dice.map(die => die.value);
    const diceFreezeValues = dice.map(die => die.freeze);

    if (
      new Set(diceValues).size === 1 && 
      !diceFreezeValues.includes(false)
    ) {
      return 'Game Over'
    } else {
      return 'Game Continues'
    }
  }

  const diceElements = dice.map((die, index) => (
    <Die 
      key={die.id} 
      value={die.value} 
      onClick={() => handleDieClick(index)}
      isFrozen={die.freeze}
    />
  ));

  return (
    <>
      <main>
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">
          {diceElements}
        </div>
        <button 
          className="roll-btn" 
          onClick={status === 'Game Over' ? restartGame : rollDice}
        >
          {status === 'Game Over' ? 'Restart Game' : 'Roll'}
        </button>
        {status === 'Game Over' && <ReactConfetti />}
      </main>
    </>
  )
}

export default App


import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard.js';


const cardImages = [
  {"src": "/img1.png", matched: false},
  {"src": "/img2.png",  matched: false},
  {"src": "/img3.png",  matched: false},
  {"src": "/img4.png",  matched: false},
  {"src": "/img5.png",  matched: false},
  {"src": "/img6.png",  matched: false},
  {"src": "/img7.png",  matched: false},
  {"src": "/img8.png",  matched: false},
  {"src": "/img9.png",  matched: false},
  {"src": "/img10.png", matched: false},
  {"src": "/img11.png", matched: false},
  {"src": "/img12.png", matched: false}
]

function App() {
  const[cards, setCards] =useState([]);
  const[turns, setTurns] = useState(0);
  const[choiceOne, setChoiceOne] = useState(null);
  const[choiceTwo, setChoiceTwo] = useState(null);
  const[disabled, setDisabled] = useState(false)

//shuffle card
const shuffleCards = () =>{
  const shuffleCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random() }))
    
  setChoiceOne(null)
  setChoiceTwo(null)
  setCards(shuffleCards)
  setTurns(0);
}

//handle a choice
const handleChoice = (card) =>{
  choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
}

//compare 2 selected cards
useEffect(() => {
  if(choiceOne && choiceTwo){
    setDisabled(true)
    if(choiceOne.src === choiceTwo.src){
      setCards(prevCards =>{
        return prevCards.map(card => {
          if(card.src === choiceOne.src){
            return{...card, matched: true}
          } else{
            return card
          }
        })
      })
      resetTurn()
    } else{
      setTimeout(() =>resetTurn(), 1000)
    }
  }
}, [choiceOne, choiceTwo])

console.log(cards)

//reset choices & increase turn
const resetTurn = () => {
  setChoiceOne(null)
  setChoiceTwo(null)
  setTurns(prevTurns => prevTurns + 1)
  setDisabled(false)
}

//start a new game automagically
useEffect(() =>{
  shuffleCards()
}, [])

  return (
    <div className='App'>
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
         <SingleCard 
         key={card.id} 
         card={card} 
         handleChoice={handleChoice}
         flipped={card === choiceOne || card === choiceTwo || card.matched}
         disabled={disabled}
         />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;

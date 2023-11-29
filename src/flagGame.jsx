import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'

export default function FlagGame({startGame}) {
    const [countries, setCountries] = useState([]);
    const [rightAnswer,setRightAnswer] = useState('')  
    const [choices,setChoices] = useState([]) 
    const [answeredCorrectly,setAnsweredCorrectly] = useState(false)
    const [correctAnswersCount,setCorrectAnswersCount] = useState(0)
    const [falseAnswersCount,setFalseAnswersCount] = useState(0)
    // fetching function
async function fetchCountries() {
    try {
    const res = await fetch('https://restcountries.com/v3.1/all');
    const data = await res.json();
    setCountries(data);
    } catch (error) {
    console.error('Error fetching countries:', error);
    }
}
useEffect(()=>{
    fetchCountries();
},[])
//handling random countriess
useEffect(() => {
    if(!answeredCorrectly && countries && countries.length > 0){
        const randomIndex = Math.floor(Math.random() * countries.length);
        const randomCountry =  countries[randomIndex]
        setRightAnswer(randomCountry.name.common)
        const allChoices = [
            randomCountry.name.common,
            countries[Math.floor(Math.random() * countries.length)].name.common,
            countries[Math.floor(Math.random() * countries.length)].name.common,
        ];
    
        const shuffledChoices = allChoices.sort(() => Math.random() - 0.5);
        setChoices(shuffledChoices)
    }
}, [countries,answeredCorrectly]);

const randomCountry = countries && countries.length > 0 ? countries.find(country => country.name.common === rightAnswer)?.flags.png : null;
function handleChoice(e){
    if(e.target.innerText === rightAnswer){
        setCorrectAnswersCount(prevState=>prevState + 1)
        setAnsweredCorrectly(true)
        setRightAnswer('')
        
    }
    else{
        setFalseAnswersCount(prevState=>prevState + 1)
        fetchCountries()
    }
}
useEffect(() => {
    if (answeredCorrectly) {
    setAnsweredCorrectly(false);
    setRightAnswer('');
    fetchCountries();
    
    }
}, [answeredCorrectly]);
return (
    <div>
    {randomCountry && <img  src={randomCountry} alt="Random Country Flag" />}
    <div className='choices-container'>
    {choices.map((choice,index)=>(
            <button className='choice-btn' key ={index} onClick={handleChoice}>{choice}</button>
            ))}
            </div>
    <div className="score-container">
        <p className='correct'>correct answers :{correctAnswersCount}</p>
        <p className='false'>false answers :{falseAnswersCount}</p>
    </div>
    <Link to="/" className="btn" onClick={startGame}>
            Back to home
          </Link>
    </div>
);
}
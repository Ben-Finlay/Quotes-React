import axios from 'axios';
import { useEffect, useState } from 'react';

const Body = (props) => {
const [randomQuoteA, setRandomQuoteA] = useState('')
const [randomQuoteQ, setRandomQuoteQ] = useState('')
const [allQuotes, setAllQuotes] = useState([])


  const getQuotes = () => {
    const url = "http://localhost:3004"
    axios.get(url).then((res) => {
      let data = res.data;
      setAllQuotes(data);
      let randomIndex = Math.floor(Math.random() * data.length)
      setRandomQuoteA(data[randomIndex].author)
      setRandomQuoteQ(data[randomIndex].quote)
    })  

  }
  
  console.log('rq', randomQuoteQ)

  useEffect(() => {
    return () => {
    getQuotes()
    }
  }, [])



  return (
    <div className="body">
<div className="quotes-div">
<blockquote className="quotes-block"> {randomQuoteQ} </blockquote>

<section className="author-line">

<p className="author-p"> - {randomQuoteA} </p>
</section>
</div>
</div>
  )
  }

export default Body;
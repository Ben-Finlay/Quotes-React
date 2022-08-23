import "./styles/App.css";
import Header from "./components/Header";
import Body from "./components/Body";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [randomQuoteA, setRandomQuoteA] = useState("");
  const [randomQuoteQ, setRandomQuoteQ] = useState("");

  const getQuotes = () => {
    const url = "http://localhost:3004";
    axios.get(url).then((res) => {
      let data = res.data;
      let randomIndex = Math.floor(Math.random() * data.length);
      setRandomQuoteA(data[randomIndex].author);
      setRandomQuoteQ(data[randomIndex].quote);
    });
  };

  useEffect(() => {
    return () => {
      getQuotes();
    };
  }, []);


  return (
    <div className="App">
      <Header
        getQuotes={getQuotes}
      />
      <Body
        randomQuoteA={randomQuoteA}
        randomQuoteQ={randomQuoteQ}
        getQuotes={getQuotes}
      />
    </div>
  );
};

export default App;

import axios from "axios";
import { useEffect, useState } from "react";

const Body = (props) => {
  const {
    randomQuoteA,
    randomQuoteQ,
  } = props
 
  return (
    <div className="body">
      <div className="quotes-div">
        <blockquote className="quotes-block"> {randomQuoteQ} </blockquote>

        <section className="author-line">
          <p className="author-p"> - {randomQuoteA} </p>
        </section>
      </div>

      <div className="cube">

      </div>
    </div>
  );
};

export default Body;

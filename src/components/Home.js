import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="main">
        <h1>Citadel</h1>
        <p>Your one stop portfolio management and analysis tool.</p>
        <Link to="/portfolio">
          <button>Launch</button>
        </Link>
      </div>
    </>
  );
};

export default Home;

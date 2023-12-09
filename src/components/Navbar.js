import React from "react";
import "./css/Navbar.css";
import Wallet from "./Wallet";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="nav">
        <Link to="/">
          <div className="brandname">Citadel</div>
        </Link>
        <div className="walletbtn">
          <Wallet />
        </div>
        
      </div>
    </>
  );
};

export default Navbar;

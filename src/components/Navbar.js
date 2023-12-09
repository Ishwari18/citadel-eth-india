import React from "react";
import "./css/Navbar.css";
import Wallet from "./Wallet";
import { Link } from "react-router-dom";
import Profile from "./Profile";

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
        <div className="pfp">
        <Link to="/pfp">
          <div className="pfpbtn">pfp</div>
        </Link>
        </div>
        
      </div>
    </>
  );
};

export default Navbar;

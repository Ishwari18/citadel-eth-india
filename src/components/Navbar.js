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
        <Link to="/profilebtn">
          <button>Profile</button>
        </Link>
      </div>
    </>
  );
};

export default Navbar;

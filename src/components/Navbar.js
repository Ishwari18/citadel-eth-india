import React from "react";
import "./css/Navbar.css";
import Wallet from "./Wallet";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  return (
    <div className="nav" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Link to="/">
        <div className="brandname">Citadel</div>
      </Link>
      <div className="rightnav" style={{ display: "flex", alignItems: "center" }}>
      <div className="pfp">
          <Link to="/pfp">
            <button className="pfpbtn" style={{bottom: "0.5em", position: "relative", color:"black", marginRight: "0.5em"}}>
              <CgProfile  />
            </button>
          </Link>
        </div>
        <div className="walletbtn">
          <Wallet />
        </div>
        
      </div>
    </div>
  );
};

export default Navbar;

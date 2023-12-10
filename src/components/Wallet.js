import React, { useState } from "react";
import Web3 from "web3";
import "./css/Wallet.css";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import { useWallet } from "./WalletContext";

const Wallet = ({ onConnect, walletAddresses }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [newWalletAddress, setNewWalletAddress] = useState("");
  const { connectedAccounts, connectWallet, disconnectWallet, addWallet } = useWallet();

  const connectToMetaMask = async () => {
    try {
      await window.ethereum.send("eth_requestAccounts");
      window.web3 = new Web3(window.ethereum);

      const accounts = await window.web3.eth.getAccounts();
      connectWallet(accounts[0]);

      // Toggle the dropdown when connecting the wallet
      setShowDropdown(!showDropdown);
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

  const handleAddWallet = async () => {
    try {
      await window.ethereum.send("eth_requestAccounts");
      window.web3 = new Web3(window.ethereum);

      const accounts = await window.web3.eth.getAccounts();
      addWallet(accounts[0]);
      setNewWalletAddress("");
      setShowDropdown(true);
    } catch (error) {
      console.error("Error adding wallet:", error);
    }
  };

  return (
    <>
      <div className="wallet">
        <button onClick={connectedAccounts.length > 0 ? () => {} : connectToMetaMask} style={{height: "4em", paddingRight: "1em", paddingLeft: "1em"}}>
          {connectedAccounts.length > 0 ? " Wallet" : "Connect Wallet"}
        </button>

        {connectedAccounts.length > 0 && (
          <button onClick={() => setShowDropdown(!showDropdown)}>
            <IoIosArrowDropdownCircle style={{ margin: "0.3em" }} />
          </button>
        )}

        {showDropdown && (
          <div className="dropdown-content" style={{backgroundColor: "#ffffffeb", color: "black", padding: "1em", margin: "1em", width: "26em", position: "relative", borderRadius: "2em"}}>
            {connectedAccounts.map((account, index) => (
             <div key={index} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <div style={{ fontSize: "0.8em",fontWeight: "500" }}>{account}</div>
             <button style={{bottom: "1em", position: "relative"}}>
               <RxCrossCircled onClick={() => disconnectWallet(account)} />
               {/* disconnect btn */}
             </button>
           </div>
            ))}
            <div style={{alignContent: "center"}}>
              <input
                type="text"
                value={newWalletAddress}
                onChange={(e) => setNewWalletAddress(e.target.value)}
                placeholder="Enter new wallet address"
                style={{margin: "1em"}}
              />
              <button onClick={async () => {
                addWallet(newWalletAddress);
              }}>Add Wallet</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Wallet;

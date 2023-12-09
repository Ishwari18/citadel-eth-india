// Wallet.js
import React, { useState } from 'react';
import Web3 from 'web3';
import "./css/Wallet.css";

const Wallet = ({ onConnect, walletAddresses }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [connectedAccount, setConnectedAccount] = useState(null);

  const connectToMetaMask = async () => {
    try {
      await window.ethereum.send('eth_requestAccounts');
      window.web3 = new Web3(window.ethereum);

      const accounts = await window.web3.eth.getAccounts();
      const newConnectedAccount = accounts[0];

      setConnectedAccount(newConnectedAccount);

      // Toggle the dropdown when connecting the wallet
      setShowDropdown(!showDropdown);
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  };

  return (
    <>
      <div className="wallet">
        <button onClick={showDropdown ? () => setShowDropdown(false) : connectToMetaMask}>
          {connectedAccount ? 'Wallet Connected' : 'Wallet'}
        </button>
      </div>
    </>
  );
};

export default Wallet;

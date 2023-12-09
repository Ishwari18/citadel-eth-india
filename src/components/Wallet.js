import React, { useState } from 'react';
import Web3 from 'web3';
import "./css/Wallet.css";

const Wallet = () => {
  const [walletAddresses, setWalletAddresses] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const connectToMetaMask = async () => {
    try {
      await window.ethereum.send('eth_requestAccounts');
      window.web3 = new Web3(window.ethereum);

      const accounts = await window.web3.eth.getAccounts();
      const connectedAccount = accounts[0];

      // Update the array of wallet addresses
      setWalletAddresses(prevAddresses => [...prevAddresses, connectedAccount]);

      // Your additional logic can go here
      // For example, minting using a contract:
      // contract.methods.safeMint(connectedAccount, URI).send({ from: connectedAccount, value: '100000000000000' });

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
          {walletAddresses.length > 0 ? 'Wallet Connected' : 'Connect Wallet'}
        </button>
      </div>
    </>
  );
};

export default Wallet;

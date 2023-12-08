import React, { useState } from 'react';
import Web3 from 'web3'; // Import Web3 here

const Wallet = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  const connectToMetaMask = async () => {
    try {
      await window.ethereum.send('eth_requestAccounts');
      window.web3 = new Web3(window.ethereum);

      const accounts = await window.web3.eth.getAccounts();
      const connectedAccount = accounts[0];
      setWalletAddress(connectedAccount);

      // Your additional logic can go here, such as interacting with contracts, etc.
      // For example, minting using a contract:
      // contract.methods.safeMint(connectedAccount, URI).send({ from: connectedAccount, value: '100000000000000' });
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  };

  return (
    <>
      <button onClick={connectToMetaMask}>Connect Wallet</button>
      {walletAddress && (
        <div>
          <p>Connected Address: {walletAddress}</p>
          {/* Additional UI or functionality for the connected state */}
        </div>
      )}
    </>
  );
};

export default Wallet;

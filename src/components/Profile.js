// Profile.js
import React, { useState } from "react";
import Navbar from "./Navbar";

const Profile = () => {
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [walletAddresses, setWalletAddresses] = useState([]); 

  const handleWalletConnect = (connectedAccount) => {
    setWalletAddresses((prevAddresses) => [...prevAddresses, connectedAccount]);
  };

  const handleWalletSelect = (wallet) => {
    setSelectedWallet(wallet);
    setShowDropdown(false);
  };

  return (
    <>
      <Navbar />
      <div>
        {/* Wallet component to handle connecting and displaying connected wallets */}
        

        {/* Dropdown to display connected wallet addresses */}
        {walletAddresses.length > 0 && selectedWallet && (
          <div className="dropdown">
            <button onClick={() => setShowDropdown(!showDropdown)}>
              {selectedWallet}
            </button>
            {showDropdown && (
              <div>
                {/* Map through all connected wallet addresses */}
                {walletAddresses.map((wallet, index) => (
                  <div key={index} onClick={() => handleWalletSelect(wallet)}>
                    {wallet}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;

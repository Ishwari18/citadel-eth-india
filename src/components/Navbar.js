import React from 'react'
import "./css/Navbar.css";
import Wallet from './Wallet';


const Navbar = () => {
  return (
    <>
   <div className='nav'>
   <div className='brandname'>Citadel</div>
   <div className="walletbtn">
   <Wallet/>
   </div>
   </div>
    </>
    
  )
}

export default Navbar
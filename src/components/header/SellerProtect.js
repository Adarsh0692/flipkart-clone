import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function SellerProtect() {
    const seller = localStorage.getItem('seller') 
   
  return (
    seller=='true' ?  <Outlet/> : <Navigate to='/seller-account'/> 
  )
}

export default SellerProtect

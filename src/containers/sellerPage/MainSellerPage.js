import React from 'react'
import style from './SellerPage.module.css'
import { useNavigate } from 'react-router-dom'

function MainSellerPage() {
    const navigate = useNavigate()
    const seller = localStorage.getItem('seller')

    function handleGetstart (){
 if(seller=='true'){
      navigate('/seller-dashBoard')
    }else{
      navigate('/seller-account')
    }
    }
  return (
    <div className={style.mainSellerWrap}>
      <h2>Welcome to Flipkart Seller Hub</h2>
     
      <button onClick={handleGetstart}>Get Start</button>
    </div>
   
  )
}

export default MainSellerPage

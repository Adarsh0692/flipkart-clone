import React from 'react'
import style from './OrderSuccess.module.css'
import { useNavigate } from 'react-router-dom'

function OrderSuccess() {
    const navigate = useNavigate()
  return (
    <div className={style.mainWrap}>
        <div className={style.success}>
        <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/orderPlacedV2_cb4f64.png" alt="" />
      <h2>Success! Your Order placed.</h2>
      <span>Your items will be delivered with in 2 days.</span>
      <div>
      <button onClick={() => navigate('/account/orders')}>Go to My Orders</button>
      </div>
        </div>
    
     
    </div>
  )
}

export default OrderSuccess

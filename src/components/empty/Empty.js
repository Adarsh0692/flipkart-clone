import React from 'react'
import style from './Empty.module.css'
import { useNavigate } from 'react-router-dom'

function Empty(props) {
  const navigate = useNavigate()
  return (
    <div className={style.empty}>
      <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/mywishlist-empty_39f7a5.png" alt="" />
      <div className={style.name}>Empty {props.name}</div>
      <div>You have no items in your {props.name}. Start adding!</div>
    {props.name === "Cart" &&  <div>
        <button onClick={()=> navigate('/')} className={style.shopBtn}>Shop Now</button>
      </div>}
    </div>
  )
}

export default Empty

import React from 'react'
import style from "./Account.module.css";

function OrderTrackingProgressBar({status}) {
  return (
    <div className={style.prbar}>
      <div className={style.initalDot}></div>
      <div className={style.Prgssbar}>
     <div className={style.Prgssbar_fill} style={{width: status === "Confirmed"? '0%' : "100%"}}></div>
      </div>
      <div className={style.lastDot} style={{backgroundColor: status === "Cancelled" ? "red" : status === "Delivered" ? "green" : "#e6e6e6"}}></div>
    </div>
  )
}

export default OrderTrackingProgressBar

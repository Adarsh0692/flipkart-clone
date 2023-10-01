import React from 'react'
import style from './SingleProduct.module.css'

function RatingProgressBar(props) {
  return (
    <div className={style.prgress_bar}>
      <div className={style.progress_fill} style={{backgroundColor:`${props.color}`, width:`${props.width}%`}}></div>
    </div>
  )
}

export default RatingProgressBar

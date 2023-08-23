import React from 'react'
import style from './Carousel.module.css'
import { Button } from '@mui/material'


function Carousel(props) {
  return (
    <div className={style.main}>
      <div className={style.left}>
      <span>{props.for}</span>
            <Button variant='contained'>View All</Button>
      </div>
      <div className={style.right}>
          {
            props.electronicsData.map((item) => (
                <div className={style.box}>
                    <img src={item.image} alt="" />
                    <span>{item.name}</span>
                    <span>{item.shop}</span>
                    <span>{item.category}</span>
                </div>
            ))
          }
      </div>
    </div>
  )
}

export default Carousel

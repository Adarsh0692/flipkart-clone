import React from 'react'
import { category } from '../../assests/categoryImages'
import style from './CategorySection.module.css'

function CategorySection() {
  return (
    <div className={style.category}>
      {
        category.map((item) => (
            <div key={item.name} className={style.categoryDiv}>
                <img src={item.image} alt={item.name} className={style.img} />
                <p>{item.name}</p>
            </div>
        ))
      }
    </div>
  )
}

export default CategorySection

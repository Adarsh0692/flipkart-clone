import React from 'react'
import style from './ProductPage.module.css'
import { Button } from '@mui/material'

function ProductPage() {
  return (
    <div className={style.product_main}>
      <div className={style.filterDiv}>
        <div className={style.allFilters}>
        <h4>Filters</h4>
        <Button>Clear all</Button>
        </div>
        
      </div>
      <div className={style.productListDiv}>

      </div>
    </div>
  )
}

export default ProductPage

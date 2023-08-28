import React from 'react'
import style from './ProductPage.module.css'
import { Button } from '@mui/material'

function Pagination() {
  return (
    <div className={style.pagination_container}>
        <span>Page 1 of 100</span>
          <div className={style.pagination}>
            <Button>Previous</Button>
      {
        [...Array(10)].map((_,i) => (
            <div key={i} className={`${style.page} ${style.activePage}`}>
                {i+1}
            </div>
        ))
      }
       <Button>next</Button>
    </div>
    </div>
   
  )
}

export default Pagination

import React from 'react'
import style from './ProductPage.module.css'
import { Button } from '@mui/material'

function Pagination({products,page,setPage}) {
  return (
    <div className={style.pagination_container}>
        <span>Page {page} of {Math.ceil(products.length/16)}</span>
          <div className={style.pagination}>
          {page>1 && <Button onClick={()=> setPage(page-1)} >Previous</Button>}
      {
        [...Array(Math.ceil(products.length/16))].map((_,i) => (
            <div key={i} className={`${style.page} ${page === i+1? style.activePage : null}`} onClick={()=>setPage(i+1)}>
                {i+1}
            </div>
        ))
      }
      {page>=products.length/16 ? null : <Button onClick={()=> setPage(page+1)}>next</Button>}
    </div>
    </div>
   
  )
}

export default Pagination

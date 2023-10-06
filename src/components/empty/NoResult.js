import React from 'react'
import style from './NoResult.module.css'

function NoResult() {
  return (
    <div className={style.noResult}>
      <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/error-no-search-results_2353c5.png" alt="image" />
      <h2>Sorry, no results found!</h2>
      <span>Please check the spelling or try searching for something else</span>
    </div>
  )
}

export default NoResult

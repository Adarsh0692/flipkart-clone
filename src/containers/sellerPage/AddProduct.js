import React, { useState } from 'react'
import style from './SellerPage.module.css'
import { categories } from './categoryData'

function AddProduct() {
   const [productCategory, setProductCategory] = useState('')
   const [typeOfOption, setTypeOfOption] = useState('')

   const typeOfArray = categories.find((categories) => categories.category === productCategory)
//    console.log('productCategory', productCategory);
//    console.log('typeOfOption', typeOfOption);

  return (
    <div className={style.sellerWrapper}>
        <h2>Add Product</h2>
         <div className={style.formContainer}>
             <select value={productCategory} onChange={(e)=> setProductCategory(e.target.value)}>
                <option >Select category...</option>
                {
                    categories.map((item, i) => (
                        <option value={item.category}>{item.category}</option>
                    ))
                }
             </select>

             <select value={typeOfOption} onChange={(e) => setTypeOfOption(e.target.value)}>
             <option value=''>Select...</option>
             {
                typeOfArray && typeOfArray.typeOf.map((item) => (
                    <option value={item}>{item}</option>
                ))
             }
             </select>
         </div>
    </div>
  )
}

export default AddProduct

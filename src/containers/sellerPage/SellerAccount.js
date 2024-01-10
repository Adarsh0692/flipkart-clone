import React, { useState } from 'react'
import style from './SellerPage.module.css'
import { useSelector } from 'react-redux'
import { selectUserID } from '../../redux/authSlice'
import { doc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase.config'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function SellerAccount() {
  const [seller, setSeller] = useState('')
  const [userID, setUserID] = useState(null)

  const navigate = useNavigate()

 async function handleSubmit(e){
  e.preventDefault()
    try {
      const userRef = doc(db, "users", userID);
      await updateDoc(userRef, {
        seller: seller
      })
      localStorage.setItem('seller', true)
     navigate('/seller-dashBoard')
    } catch (error) {
      console.log(error);
    }
  }

  // useEffect(() => {
  //   const seller = localStorage.getItem('seller')
  //   if(seller=='true'){
  //     navigate('/seller-dashBoard')
  //   }else{
  //     navigate('/seller-account')
  //   }
  // },[])

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      if(user){
        const id = user.uid
        setUserID(id)
      }
    })
    return () => unSub()
  },[])



  return (
    <div className={style.mainWrap}>
      <div className={style.card}>
        <form onSubmit={handleSubmit}>
         <input type="text" value={seller} onChange={(e)=>setSeller(e.target.value)} placeholder='Enter your company name' required/>
         <input type="text" placeholder='Enter your name' required/>
         <input type="text" placeholder='Enter GSTIN (optional)' />
          <button type='submit'>Register & Continue →</button>
          </form>
      </div>
    </div>
  )
}

export default SellerAccount

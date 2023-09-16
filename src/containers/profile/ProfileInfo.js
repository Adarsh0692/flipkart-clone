import React, { useState } from 'react'
import style from './Account.module.css'
import { TextField } from '@mui/material'

function ProfileInfo() {
    const [isPersonalInfoEdit, setIsPersonalInfoEdit] = useState(true)
    const [isAddressEdit, setIsAddressEdit] = useState(true)
    const [isMobileEdit, setIsMobileEdit] = useState(true)

  return (
    <div className={style.mainInfoDiv}>
      <div className={style.infoContainer}>
        <div className={style.infoTitle}>
          <span>Personal Information</span>
          {isPersonalInfoEdit ? <button onClick={()=>setIsPersonalInfoEdit(false)}>Edit</button> : <button onClick={()=>setIsPersonalInfoEdit(true)}>Cancel</button>}
        </div>
        <div className={style.inputDiv}>
        <TextField label="First Name" variant="outlined" disabled={isPersonalInfoEdit} />
        <TextField label="Last Name" variant="outlined" disabled={isPersonalInfoEdit} />
         {!isPersonalInfoEdit && <button>SAVE</button>}
        </div>
        <div>
          Your Gender
        </div>
        <div>
          <input type="radio" id='male' name='gender' value='Male' disabled={isPersonalInfoEdit}/>
          <label htmlFor="male">Male</label>
          <input type="radio" id='female' name='gender' value='Female' disabled={isPersonalInfoEdit}/>
          <label htmlFor="female">Female</label>
        </div>
      </div>
      <div className={style.infoContainer}>
        <div className={style.infoTitle}>
          <span>Email Address</span>
          {isAddressEdit ? <button onClick={()=>setIsAddressEdit(false)}>Edit</button> : <button onClick={()=>setIsAddressEdit(true)}>Cancel</button>}
        </div>
        <div className={style.inputDiv}>
        <TextField label="Email Address" variant="outlined" disabled={isAddressEdit}/>
         {!isAddressEdit && <button>SAVE</button>}
        </div>
      </div>
      <div className={style.infoContainer}>
        <div className={style.infoTitle}>
          <span>Mobile Number</span>
          {isMobileEdit ? <button onClick={()=>setIsMobileEdit(false)}>Edit</button> : <button onClick={()=>setIsMobileEdit(true)}>Cancel</button>}
        </div>
        <div className={style.inputDiv}>
        <TextField label="Mobile Number" variant="outlined" disabled={isMobileEdit}/>
        { !isMobileEdit && <button>SAVE</button>}
        </div>
      </div>
    </div>
  )
}

export default ProfileInfo

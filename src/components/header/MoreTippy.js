import React from 'react'
import style from './Header.module.css'
import NotificationsIcon from '@mui/icons-material/Notifications';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GetAppIcon from '@mui/icons-material/GetApp';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

function MoreTippy() {
  return (
    <div className={style.mainLoginTDiv}>
     
      <div>
        <span><NotificationsIcon
            sx={{ fontSize: "20px", mr: "10px", color: "#1976D2" }}
          /></span>
        <span>Notification Preferences</span>
      </div>
      <div>
        <span><SupportAgentIcon
            sx={{ fontSize: "20px", mr: "10px", color: "#1976D2" }}
          /></span>
        <span>24x7 Customer Care</span>
      </div>
      <div>
        <span><TrendingUpIcon
            sx={{ fontSize: "20px", mr: "10px", color: "#1976D2" }}
          /></span>
        <span>Advertise</span>
      </div>
      <div>
        <span><GetAppIcon
            sx={{ fontSize: "20px", mr: "10px", color: "#1976D2" }}
          /></span>
        <span>Download App</span>
      </div>
      
     
    </div>
  )
}

export default MoreTippy

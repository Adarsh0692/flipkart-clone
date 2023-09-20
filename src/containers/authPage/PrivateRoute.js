import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'



function PrivateRoute({element, ...rest}) {
    const isActive = localStorage.getItem('isActive')
  return (
    isActive ? (
        <Outlet />
    ) : (
        <Navigate to="/login"/>
    )
  )
}

export default PrivateRoute

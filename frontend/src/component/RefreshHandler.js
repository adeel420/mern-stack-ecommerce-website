import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function RefreshHandler({setIsAuthenticated}) {
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(()=>{
        if(localStorage.getItem('token')){
            setIsAuthenticated(true)
            if(location.pathname === '/' || location.pathname === '/signup' || location.pathname === '/forget-password'){
                navigate('/home')
            }
        }
    },[setIsAuthenticated, location, navigate])
  return (
    null
  )
}

export default RefreshHandler

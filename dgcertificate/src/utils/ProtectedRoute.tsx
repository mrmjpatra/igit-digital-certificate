import React from 'react'
import { useAppSelector } from '../state/hooks';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
  const isLoggedIn = useAppSelector(state => {
    return state.auth.isLoggedIn
  })
  return (
    isLoggedIn ? <Outlet /> : <Navigate to="/login" />
  )
}

export default ProtectedRoute
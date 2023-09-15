import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

const DefaultLayout = () => {
  const [auth] = useState(localStorage.getItem('isAuthenticated') || false)
  console.log('Default layout: ', auth)
  if (!auth) {
    return <Navigate replace to="/login" />
  } else {
    return (
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3">
            <AppContent />
          </div>
          <AppFooter />
        </div>
      </div>
    )
  }
}

export default DefaultLayout

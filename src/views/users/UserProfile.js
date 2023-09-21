import React, { useState, useRef } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CToaster,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'
import PropTypes from 'prop-types'
import customToast from 'src/custom/toast/Toast'

const UserProfile = (props) => {
  const [toast, setToast] = useState(0)
  const [auth] = useState(localStorage.getItem('isAuthenticated') || false)
  console.log('Authenticated: ', auth)
  const toaster = useRef()

  // Destructure the 'user' object directly from 'location.state'
  const location = useLocation()
  const user = location.state

  if (!auth) {
    return <Navigate replace to="/login" />
  } else {
    return (
      <div>
        <h1>{user && user.id}</h1>
        <h1>{user && user.name}</h1>
        <h1>{user && user.username}</h1>
        <h1>{user && user.value}</h1>
        <h1>{user && user.email}</h1>
      </div>
    )
  }
}

UserProfile.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string,
        // Add more PropTypes for other properties if necessary
      }),
    }),
  }),
}

export default UserProfile

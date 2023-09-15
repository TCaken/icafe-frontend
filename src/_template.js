import React, { useState, useRef } from 'react'
import { Navigate } from 'react-router-dom'
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
import customToast from 'src/custom/toast/Toast'

const Filename = (props) => {
  const [toast, setToast] = useState(0)
  const [auth] = useState(localStorage.getItem('isAuthenticated') || false)
  console.log('Authenticated: ', auth)
  const toaster = useRef()

  //Body

  if (!auth) {
    return <Navigate replace to="/login" />
  } else {
    return (
      <div>
        <h1>Change Here</h1>
      </div>
    )
  }
}

export default Filename

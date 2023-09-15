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
  CButtonGroup,
  CToaster,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilPlus, cilTrash } from '@coreui/icons'
import customToast from 'src/custom/toast/Toast'

const Users = (props) => {
  const [toast, setToast] = useState(0)
  const [auth] = useState(localStorage.getItem('isAuthenticated') || false)
  console.log('Authenticated: ', auth)
  const toaster = useRef()

  const [users, setUsers] = React.useState([])
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/v1/users`)
      setUsers(res.data)
    } catch (err) {
      console.log(err)
    }
  }
  React.useEffect(() => {
    fetchUsers()
  }, [])

  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/v1/users/${userId}`)
      setToast(customToast(response.data.message))
      fetchUsers()
    } catch (error) {
      console.error('Error during delete:', error)
    }
  }

  // const users = await axios.get(`http://localhost:4000/api/users/get-all`).then((res) => res.data)
  console.log(users)

  if (!auth) {
    return <Navigate replace to="/login" />
  } else {
    return (
      <div>
        <CTable className="mt-3 ms-0">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Id</CTableHeaderCell>
              <CTableHeaderCell scope="col">Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Email</CTableHeaderCell>
              <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
              <CTableHeaderCell scope="col">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {users.map((user) => (
              // eslint-disable-next-line react/jsx-key
              <CTableRow key={user.id}>
                <CTableHeaderCell scope="row">{user.id}</CTableHeaderCell>
                <CTableDataCell>{user.name}</CTableDataCell>
                <CTableDataCell>{user.email}</CTableDataCell>
                <CTableDataCell>{user.value}</CTableDataCell>
                <CTableDataCell>
                  <CButtonGroup role="sm" aria-label="Default button group">
                    <CButton color="success" variant="outline">
                      <CIcon icon={cilPlus} size="sm" />
                    </CButton>
                    <CButton color="warning" variant="outline">
                      <CIcon icon={cilPencil} size="sm" />
                    </CButton>
                    <CButton color="danger" variant="outline" onClick={() => handleDelete(user.id)}>
                      <CIcon icon={cilTrash} size="sm" />
                    </CButton>
                  </CButtonGroup>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>

        <CToaster ref={toaster} push={toast} placement="top-end" />
      </div>
    )
  }
}

export default Users

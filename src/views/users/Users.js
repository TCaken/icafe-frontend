import React, { useState, useRef } from 'react'
import { Navigate, Link } from 'react-router-dom'
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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
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

  const [users, setUsers] = useState([])
  const [userId, setUserId] = useState(null)
  const [amount, setAmount] = useState(0)
  const [amountModal, setAmountModal] = useState(false)
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

  const handleAdd = async (id) => {
    console.log('Add')
  }

  const handleEdit = async (id) => {
    console.log('Edit')
  }

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/v1/users/${id}`)
      setToast(customToast(response.data.message))
      fetchUsers()
    } catch (error) {
      console.error('Error during delete:', error)
    }
  }

  const addAmount = async (id, amount) => {
    console.log('Add amount to user')
  }

  const editUser = async (id, user) => {
    console.log('Edit user information')
  }

  // const users = await axios.get(`http://localhost:4000/api/users/get-all`).then((res) => res.data)
  console.log(users)

  if (!auth) {
    return <Navigate replace to="/login" />
  } else {
    return (
      <div>
        <CModal
          visible={amountModal}
          onClose={() => setAmountModal(false)}
          aria-labelledby="ModalAmount"
        >
          <CModalHeader onClose={() => setAmountModal(false)}>
            <CModalTitle id="ModalAmountLabel">Add Amount </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p>Woohoo</p>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setAmountModal(false)}>
              Close
            </CButton>
            <CButton color="primary">Add Amount</CButton>
          </CModalFooter>
        </CModal>
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
                <CTableHeaderCell scope="row">
                  <Link to="/users/user" state={user}>
                    {user.name}
                  </Link>
                </CTableHeaderCell>
                <CTableDataCell>{user.name}</CTableDataCell>
                <CTableDataCell>{user.email}</CTableDataCell>
                <CTableDataCell>{user.value}</CTableDataCell>
                <CTableDataCell>
                  <CButtonGroup role="sm" aria-label="Default button group">
                    <CButton color="success" variant="outline">
                      <CIcon
                        icon={cilPlus}
                        size="sm"
                        onClick={() => setAmountModal(!amountModal)}
                      />
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

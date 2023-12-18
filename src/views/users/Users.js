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
  CCol,
  CForm,
  CFormInput,
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
  const [addBalanceModal, setAddBalanceModal] = useState(false)
  const [editUserModal, setEditUserModal] = useState(false)
  const [userData, setUserData] = useState({
    id: '',
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    value: '',
  })

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

  const handleInputChange = (event) => {
    const { id, value } = event.target
    setUserData({
      ...userData,
      [id]: value,
    })
  }

  const handleAddClick = (user) => {
    setUserData({ ...userData, ...user })
    console.log(userData)
    setAddBalanceModal(!addBalanceModal)
  }

  const handleAdd = async (event) => {
    event.preventDefault()
    console.log(userData)

    try {
      // Send a POST request with userData & balance
      const response = await axios.post(
        `http://localhost:4000/api/v1/users/balance/${userData.id}`,
        userData,
      )
      setToast(customToast(response.data.message))

      // Reset the form data after successful submission
      setUserData({
        id: '',
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        value: '',
      })
    } catch (error) {
      setToast(customToast(error))
      console.error('Error add balance:', error)
    }

    fetchUsers()
    setAddBalanceModal(false)
  }

  const handleEditClick = (user) => {
    setUserData({ ...userData, ...user })
    setEditUserModal(!editUserModal)
  }

  const handleEdit = async (event) => {
    event.preventDefault()

    //console.log(userData)
    try {
      // Send a PUT request with userData
      const response = await axios.put(
        `http://localhost:4000/api/v1/users/${userData.id}`,
        userData,
      )
      setToast(customToast(response.data.message))

      // Reset the form data after successful submission
      setUserData({
        id: '',
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        value: '',
      })
    } catch (error) {
      setToast(customToast(error))
      console.error('Error editing user:', error)
    }

    fetchUsers()
    setEditUserModal(false)
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

  if (!auth) {
    return <Navigate replace to="/login" />
  } else {
    return (
      <div>
        {/* Add User Balance Modal */}
        <CModal
          visible={addBalanceModal}
          onClose={() => setAddBalanceModal(false)}
          aria-labelledby="ModalAddBalance"
        >
          <CModalHeader
            onClose={() => {
              setAddBalanceModal(false)
            }}
          >
            <CModalTitle id="ModalAddAmountLabel">Add Balance</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm className="row g-3 needs-validation">
              <CCol md={12}>
                <CFormInput
                  type="number"
                  value={userData.value}
                  onChange={handleInputChange}
                  id="value"
                  label="Value"
                />
              </CCol>
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setAddBalanceModal(false)}>
              Discard
            </CButton>
            <CButton color="primary" onClick={handleAdd}>
              Apply
            </CButton>
          </CModalFooter>
        </CModal>

        {/* Edit user modal  */}
        <CModal
          visible={editUserModal}
          onClose={() => setEditUserModal(false)}
          aria-labelledby="ModalEditUser"
        >
          <CModalHeader
            onClose={() => {
              setEditUserModal(false)
            }}
          >
            <CModalTitle id="ModalEditUserAmount">Edit Account Information</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm className="row g-3 needs-validation" onSubmit={handleEdit}>
              <CCol md={6}>
                <CFormInput type="text" value={userData.id} id="id" label="Id" disabled />
                <CFormInput
                  type="text"
                  placeholder="John Doe"
                  value={userData.name}
                  onChange={handleInputChange}
                  id="name"
                  label="Name"
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  type="text"
                  placeholder="John"
                  value={userData.username}
                  onChange={handleInputChange}
                  id="username"
                  label="Username"
                />
              </CCol>
              <CCol md={12}>
                <CFormInput
                  type="email"
                  placeholder="johndoe@gmail.com"
                  value={userData.email}
                  onChange={handleInputChange}
                  id="email"
                  label="Email"
                />
              </CCol>
              <CCol md={12}>
                <CFormInput
                  type="password"
                  value={userData.password}
                  id="password"
                  label="Password"
                  disabled
                />
              </CCol>
              <CCol md={12}>
                <CFormInput
                  type="password"
                  value={userData.confirm_password}
                  id="confirm_password"
                  label="Confirm Password"
                  disabled
                />
              </CCol>
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setEditUserModal(false)}>
              Discard
            </CButton>
            <CButton color="primary" onClick={handleEdit}>
              Apply
            </CButton>
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
                <CTableHeaderCell scope="row">{user.id}</CTableHeaderCell>
                <CTableDataCell>
                  <Link to="/users/user" state={user}>
                    {user.name}
                  </Link>
                </CTableDataCell>
                <CTableDataCell>{user.email}</CTableDataCell>
                <CTableDataCell>{user.value}</CTableDataCell>
                <CTableDataCell>
                  <CButtonGroup role="sm" aria-label="Default button group">
                    <CButton color="success" variant="outline" onClick={() => handleAddClick(user)}>
                      <CIcon icon={cilPlus} size="sm" />
                    </CButton>
                    <CButton
                      color="warning"
                      variant="outline"
                      onClick={() => handleEditClick(user)}
                    >
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

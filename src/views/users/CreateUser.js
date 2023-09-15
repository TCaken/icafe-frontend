import React, { useState, useRef, Navigate } from 'react'
import axios from 'axios'
import { CButton, CCol, CForm, CFormInput, CToaster } from '@coreui/react'
import customToast from 'src/custom/toast/Toast'

const CreateUser = (props) => {
  const [toast, setToast] = useState(0)
  const toaster = useRef()
  const [auth] = useState(localStorage.getItem('isAuthenticated') || false)
  console.log('Authenticated: ', auth)

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    value: '',
  })
  const handleSubmit = async (event) => {
    event.preventDefault() // Prevent the default form submission

    console.log(formData)
    try {
      // Send a POST request with formData
      const response = await axios.post('http://localhost:4000/api/v1/users', formData)
      setToast(customToast(response.data.message))

      // Reset the form data after successful submission
      setFormData({
        name: '',
        username: '',
        email: '',
        password: '',
        confirm_password: '',
        value: '',
      })
    } catch (error) {
      setToast(customToast(error))
      console.error('Error creating user:', error)
    }
  }

  const handleInputChange = (event) => {
    const { id, value } = event.target
    setFormData({
      ...formData,
      [id]: value,
    })
  }

  const handleUser1 = async (event) => {
    event.preventDefault() // Prevent the default form submission

    setFormData({
      name: 'test1',
      username: 'test1@gmail.com',
      email: 'test1@gmail.com',
      password: 'test1',
      confirm_password: 'test1',
      value: '100000',
    })
  }

  const handleUser2 = async (event) => {
    event.preventDefault() // Prevent the default form submission

    setFormData({
      name: 'test2',
      username: 'test2@gmail.com',
      email: 'test2@gmail.com',
      password: 'test2',
      confirm_password: 'test2',
      value: '1000000',
    })
  }

  if (!auth) {
    return <Navigate replace to="/login" />
  } else {
    return (
      <div>
        <h1>Create User</h1>
        <CForm className="row mt-3 g-3 needs-validation" onSubmit={handleSubmit}>
          <CCol md={6}>
            <CFormInput
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleInputChange}
              id="name"
              label="Name"
            />
          </CCol>
          <CCol md={6}>
            <CFormInput
              type="text"
              placeholder="John"
              value={formData.username}
              onChange={handleInputChange}
              id="username"
              label="Username"
            />
          </CCol>
          <CCol md={12}>
            <CFormInput
              type="email"
              placeholder="johndoe@gmail.com"
              value={formData.email}
              onChange={handleInputChange}
              id="email"
              label="Email"
            />
          </CCol>
          <CCol md={12}>
            <CFormInput
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              id="password"
              label="Password"
            />
          </CCol>
          <CCol md={12}>
            <CFormInput
              type="password"
              value={formData.confirm_password}
              onChange={handleInputChange}
              id="confirm_password"
              label="Confirm Password"
            />
          </CCol>
          <CCol md={12}>
            <CFormInput
              type="number"
              value={formData.value}
              onChange={handleInputChange}
              id="value"
              label="Value"
            />
          </CCol>
          <CCol xs={12}>
            <CButton color="primary" type="submit">
              Create
            </CButton>
          </CCol>
        </CForm>
        <CButton className="mt-3 me-4" color="secondary" onClick={handleUser1}>
          Add Test1
        </CButton>

        <CButton className="mt-3" color="secondary" onClick={handleUser2}>
          Add Test2
        </CButton>

        <CToaster ref={toaster} push={toast} placement="top-end" />
      </div>
    )
  }
}

export default CreateUser

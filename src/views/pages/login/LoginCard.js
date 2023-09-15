import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CRow,
  CToaster,
} from '@coreui/react'
import customToast from 'src/custom/toast/Toast'
import CIcon from '@coreui/icons-react'
import { cilRss } from '@coreui/icons'

const Login = () => {
  const [toast, setToast] = useState(0)
  const toaster = useRef()
  const ref = useRef(null)
  const [id, setId] = useState('')
  const [email, setEmail] = useState('test')

  useEffect(() => {
    ref.current.focus()
  }, [])

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      console.log('Pressed Enter', id)
      try {
        const response = await axios.post('http://localhost:4000/api/users/logincard', {
          cardId: id,
        })

        console.log('Email:', response.data.email)
        setEmail(response.data.email)
        console.log('Response from react', response)
      } catch (error) {
        console.log('Error during card reading', error)
      }
      setId('')
    } else {
      setId(id + event.key)
      console.log(id)
    }
  }

  return (
    <div
      className="bg-light min-vh-100 d-flex flex-row align-items-center"
      ref={ref}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Tap Your Card</h1>
                    <p className="text-medium-emphasis">Place your card near the reader</p>
                    <CIcon icon={cilRss} size="7xl" className="text-secondary" />
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
      <CToaster ref={toaster} push={toast} placement="top-end" />
      <div>
        <p>Email : {email}</p>
      </div>
    </div>
  )
}

export default Login

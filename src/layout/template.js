import React, { useState, useRef, createRef } from 'react'
import axios from 'axios'
import { CButton, CCol, CForm, CFormInput, CToaster } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import customToast from 'src/custom/toast/Toast'

const Templaye = (props) => {
  const [toast, setToast] = useState(0)
  const toaster = useRef()

  //Write the body code after here

  //End here
  return (
    <div>
      {/*  Start here */}

      
      {/*  End here */}
      <CToaster ref={toaster} push={toast} placement="top-end" />
    </div>
  )
}

export default CreateUser

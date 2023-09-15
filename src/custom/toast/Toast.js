/* eslint-disable react/prop-types */
import React from 'react'
import { CToast, CToastHeader, CToastBody } from '@coreui/react'

const customToast = (message) => (
  <CToast>
    <CToastHeader closeButton>
      <svg
        className="rounded me-2"
        width="20"
        height="20"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
        role="img"
      >
        <rect width="100%" height="100%" fill="#007aff"></rect>
      </svg>
      <div className="fw-bold me-auto">Internet Cafe</div>
      <small>Time</small>
    </CToastHeader>
    <CToastBody>{message}</CToastBody>
  </CToast>
)

export default customToast

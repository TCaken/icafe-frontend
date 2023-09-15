import React, { useState, useRef } from 'react'
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

const LinkCard = (props) => {
  const [users, setUsers] = React.useState([])
  const [toast, setToast] = useState(0)
  const toaster = useRef()
  const fetchUsersWithCards = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/users/getcards`)
      console.log(res.data)
      setUsers(res.data)
    } catch (err) {
      console.log(err)
    }
  }
  React.useEffect(() => {
    fetchUsersWithCards()
  }, [])

  const handleDelete = async (userId) => {
    try {
      const response = await axios.post(`http://localhost:4000/api/users/delete/${userId}`)
      setToast(customToast(response.data.message))
      fetchUsersWithCards()
    } catch (error) {
      console.error('Error during delete:', error)
    }
  }

  // const users = await axios.get(`http://localhost:4000/api/users/get-all`).then((res) => res.data)
  console.log(users)

  return (
    <div>
      <h1>Link Card</h1>
      <p>
        Each user can only maximum one activated card at one time. For each user that already have
        card, adding a new card will automatically deactivate the older card
      </p>
      <CTable className="mt-5">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Id</CTableHeaderCell>
            <CTableHeaderCell scope="col">Username</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
            <CTableHeaderCell scope="col">CardId</CTableHeaderCell>
            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {users.map((user) => (
            // eslint-disable-next-line react/jsx-key
            <CTableRow key={user.id}>
              <CTableHeaderCell scope="row">{user.id}</CTableHeaderCell>
              <CTableDataCell>{user.username}</CTableDataCell>
              <CTableDataCell>{user.email}</CTableDataCell>
              <CTableDataCell>{user.card_id}</CTableDataCell>
              <CTableDataCell>
                <CButton color="danger" onClick={() => handleDelete(user.id)}>
                  <CIcon icon={cilTrash} size="xl" />
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      <CToaster ref={toaster} push={toast} placement="top-end" />
    </div>
  )
}

export default LinkCard

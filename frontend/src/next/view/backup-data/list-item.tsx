import { DeleteOutlined } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import { format } from 'date-fns'
import { useState } from 'react'
import styled from 'styled-components'

const ConfirmModal = ({ open, onClose }) => (
  <Modal
    open={open}
    title="Restore version history"
    cancelText={'Cancel'}
    cancelButtonProps={{ danger: true }}
    okText={'Restore'}
    onCancel={onClose}
  >
    <p>Are you sure to restore version history?</p>
  </Modal>
)

export default function ListDBItem({ db }) {
  const [openConfirmModal, setOpenConfirmModal] = useState(false)
  const formatTime = (time: string) => {
    return format(new Date(Number(time)), 'H:mm, MMM d, yyyy')
  }

  return (
    <>
      <ListItem onClick={() => setOpenConfirmModal(true)}>
        <div style={{ justifyContent: 'space-between', alignItems: 'center' }} className="d-flex">
          <p> Version at {formatTime(db.name.split('COMP-1640-version-')?.[1])}</p>
          <Button type="text" danger icon={<DeleteOutlined />} onClick={() => {}} />
        </div>
      </ListItem>
      <ConfirmModal open={openConfirmModal} onClose={() => setOpenConfirmModal(false)} />
    </>
  )
}

const ListItem = styled.div`
  &:hover {
    background: #cecece77;
  }
  padding: 16px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
`

import { message } from 'antd'
import useRoleNavigate from 'next/libs/use-role-navigate'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './unauthorize.css'
export default function UnAuthorize() {
  const navigate = useRoleNavigate()
  const { state } = useLocation()
  useEffect(() =>{
    setTimeout(() => {
      navigate(state?.from || '/')
      return message.warning('Your role are not permitted to access that page')
  }, 2000)
}, 
  [])
  return (
    <>
      <div className="message">You are not authorized.</div>
      <div className="message2">You tried to access a page you did not have prior authorization for.</div>
      <div className="container">
        <div className="neon">403</div>
      </div>
    </>
  )
}

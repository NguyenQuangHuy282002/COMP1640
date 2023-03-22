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
      return message.info('Your role are not permitted to access this page')
  }, 3000)}, [])
  return (
    <>
      <div className="message">You are not authorized.</div>
      <div className="message2">You tried to access a page you did not have prior authorization for.</div>
      <div className="container">
        <div className="neon">403</div>
        <div className="door-frame">
          <div className="door">
            <div className="rectangle"></div>
            <div className="handle"></div>
            <div className="window">
              <div className="eye"></div>
              <div className="eye eye2"></div>
              <div className="leaf"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

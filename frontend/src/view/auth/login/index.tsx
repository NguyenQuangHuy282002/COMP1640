import { message } from 'antd'
import { useSnackbar } from 'notistack'
import { useNavigate, useLocation } from 'react-router-dom'

function Login() {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const { state } = useLocation()

  const handleSubmit = async (val: any) => {
    try {
      message.success('Đăng nhập thành công!')

      return navigate(state?.from || '/')
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' })
    }
  }
  const handleClose = () => {
    navigate('/')
  }
  return <></>
}

export default Login

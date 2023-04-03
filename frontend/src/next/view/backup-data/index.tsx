import { Progress, Result, Space, Typography } from 'antd'
import { Http } from 'next/api/http'
import { BlueColorButton } from 'next/components/custom-style-elements/button'
import RubikLoader from 'next/components/loader/rubik-loader'
import { imgDir } from 'next/constants/img-dir'
import { useSocket } from 'next/socket.io'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'

const { Text, Title } = Typography

let countSuccess = 0

export default function BackupDataManager() {
  const { enqueueSnackbar } = useSnackbar()
  const { appSocket } = useSocket()
  const [loading, setLoading] = useState(false)
  const [failToBackUp, setFailToBackUp] = useState(false)
  const [percents, setPercents] = useState(0)

  const backupData = async () => {
    setFailToBackUp(false)
    setLoading(true)
    setPercents(0)
    await Http.get('/api/v1/backup')
      .catch(error => {
        enqueueSnackbar('Failed to backup data!', { variant: 'error' })
        setLoading(false)
        setFailToBackUp(true)
      })
      .finally(() => countSuccess++)
  }

  const backupProcessing = data => {
    setPercents(Math.ceil((Number(data.progress) / Number(data.total)) * 100))
  }

  useEffect(() => {
    appSocket.on('backup', backupProcessing)
    return () => {
      appSocket.off('backup', backupProcessing)
    }
  }, [backupProcessing])

  useEffect(() => {
    if (percents === 100) {
      setTimeout(() => {
        setLoading(false)
      }, 300)
    }
  }, [percents])

  return (
    <Space direction="vertical" style={{ padding: 20 }} className="w-100">
      <Title style={{ margin: 0, marginBottom: 20 }}>Backup data feature!</Title>
      <BlueColorButton loading={loading} onClick={backupData} disabled={loading}>
        Start backup data
      </BlueColorButton>

      {loading && (
        <>
          <RubikLoader />
          <Text>In progress...</Text>
          <Progress percent={percents} strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} />
        </>
      )}
      {!loading && !failToBackUp && countSuccess > 0 && (
        <Space direction="vertical" className="w-100 center" style={{ paddingTop: 50 }}>
          <Progress type="circle" percent={100} strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} />
          <Title>Backup data successfull!</Title>
        </Space>
      )}
      {!loading && failToBackUp && countSuccess > 0 && (
        <Result status="error" title="Backup data failed" subTitle="Please trying to backup data again!" />
      )}
    </Space>
  )
}

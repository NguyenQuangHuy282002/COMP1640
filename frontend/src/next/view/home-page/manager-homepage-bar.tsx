import { Button, Descriptions } from 'antd';
import { formatDayTime } from 'next/utils/helperFuncs';

export default function ManagerBar () {
  return (
    <div style={{
      backgroundColor: '#fff',
      border: '1px solid #fff',
      borderRadius: '8px',
      padding: '10px',
      marginBottom: '10px',
      boxShadow: 'rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em'
    }}>

      <Descriptions
        title="Ideas Management"
        bordered
        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
      >
        <Descriptions.Item label="Product">Leaks</Descriptions.Item>
        <Descriptions.Item label="University">Leonardo Aks</Descriptions.Item>
        <Descriptions.Item label="Time">{formatDayTime(new Date())}</Descriptions.Item>
        <Descriptions.Item label="Action">
          <Button type="primary">
            Export to CSV
          </Button>
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}


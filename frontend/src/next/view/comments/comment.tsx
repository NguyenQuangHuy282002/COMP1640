import { formatDayTime } from '../../utils/helperFuncs';
import { DislikeOutlined, EditOutlined, EllipsisOutlined, ExclamationCircleOutlined, LikeOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Skeleton, Switch } from 'antd';
import React, { useState } from 'react';

const { Meta } = Card;

function Comment () {
  const [loading, setLoading] = useState(true);

  const onChange = (checked: boolean) => {
    setLoading(!checked);
  };

  const data = {
    name: 'Yes Văn Sir',
    createdAt: Date.now(),
    content: '<p>I was wrong. Most hiring managers I speak to pay lip service to how they’re looking for strong CS fundamentals, passion, and great projects over pedigree, but in practice, the system breaks down.</p>'
  }

  return (
    <>
      <Card style={{ width: '100%', border: '1px solid #ccc' }} 
      // loading={loading}
      actions={[
        <LikeOutlined style={{color: 'black'}} key="like" />,
        <DislikeOutlined style={{color: 'black'}} key="dislike" />,
        <ExclamationCircleOutlined style={{color: 'black'}} key="report" />,
      ]}
      >
        <Meta
          avatar={<Avatar src="https://joesch.moe/api/v1/random?key=1" style={{ background: '#ccc' }}/>}
          title={data.name}
          description={<>Commented {formatDayTime(data.createdAt)}</>}
        />
        <div style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: data.content }}></div>
        
      </Card>
    </>
  );
};

export default Comment;
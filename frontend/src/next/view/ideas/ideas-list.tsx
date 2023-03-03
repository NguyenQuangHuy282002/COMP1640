import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Space } from 'antd';
import React from 'react';
import IdeaCard from './idea-card';

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

function IdeasList ({ideas, isLoading}) {
  return(
  <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: (page) => {
        console.log(page);
      },
      pageSize: 5,
    }}
    dataSource={ideas}
    renderItem={(idea) => (
      <IdeaCard key={`${idea}`} idea={idea} isLoading={isLoading}></IdeaCard>
    )}
  />
)
      };

export default IdeasList;
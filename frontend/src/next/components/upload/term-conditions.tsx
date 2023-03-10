import { Carousel, Modal } from 'antd'
const contentStyle: React.CSSProperties = {
  height: '400px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#ccc',
}
export default function TermCondition({ isOpen, onCloseModal }) {
  const onFinish = async () => {
    onCloseModal()
  }

  return (
    <Modal
      open={isOpen}
      onCancel={() => {
        onCloseModal()
      }}
      title="Terms and Conditions"
      onOk={onFinish}
      destroyOnClose
    >
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
      </Carousel>
    </Modal>
  )
}

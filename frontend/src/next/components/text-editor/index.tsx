import { Editor } from 'react-draft-wysiwyg'
interface IRichTextEditor {
  editorState: any
  setEditorState: (val: any) => void
  placeholder?: string
  style?: Object
}

function RichTextEditor(props: IRichTextEditor) {
  const { editorState, setEditorState, placeholder, style } = props

  const onChange = async (value: any) => {
    setEditorState(value)
  }

  const toolBarOptions = {
    inline: { inDropdown: true },
    list: { inDropdown: true },
    textAlign: { inDropdown: true },
    link: { inDropdown: true },
    history: { inDropdown: true },
    image: {
      // uploadCallback: uploadImageCallBack,
      alt: { present: true, mandatory: true },
    },
  }

  return (
    <div style={style}>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={(value: any) => {
          onChange(value)
        }}
        toolbarStyle={{
          background: '#f7fbfa',
          border: '0.5px solid #ccc',
        }}
        editorStyle={{
          border: '1px #ccc solid',
          background: 'white',
          padding: '0 10px',
          wordBreak: 'break-word',
          fontWeight: '400',
          resize: 'vertical',
          height: '160px',
          width: '100%',
          borderRadius: '5px',
          overflow: 'auto',
          boxShadow: 'inset 0px 1px 1px #ccc',
        }}
        toolbar={toolBarOptions}
        stripPastedStyles
        ariaLabel="draftEditor"
        placeholder={placeholder || 'Description'}
      />
    </div>
  )
}
export default RichTextEditor

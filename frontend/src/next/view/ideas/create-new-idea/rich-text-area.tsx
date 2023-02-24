// import { useState, useRef } from "react";
// import  ReactQuill  from  "react-quill";
// import  "react-quill/dist/quill.snow.css";
// import  "react-quill/dist/quill.bubble.css";
// const modules = {
//   toolbar: [
//     ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
//     ['blockquote', 'code-block'],
//     [{ 'header': 1 }, { 'header': 2 }],               // custom button values
//     [{ 'list': 'ordered'}, { 'list': 'bullet' }],
//     [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
//     [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
//     [{ 'direction': 'rtl' }],                         // text direction
//     [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
//     [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
//     [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
//     [{ 'font': [] }],
//     [{ 'align': [] }],
//     ['clean'],                                        // remove formatting button
//     ['link', 'image', 'video']       
//   ],
// };

// export default function RichTextArea (props) {
//   return <ReactQuill style={{ background: 'white' }} modules={modules} theme="snow" onChange={ (newContent) => props.setContent(newContent)} placeholder="Content goes here..." />;
// };
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const RichTextArea = ({ editorState, setEditorState }) => {
  const onChange = async (value: any) => {
    setEditorState(value);
  };

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
    <div>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={(value: any) => {
          onChange(value);
        }}
        toolbarStyle={{
          background: "#f7fbfa",
          border: "0.5px solid #ccc"
        }}
        editorStyle={{ 
          border: "1px #ccc solid",
          background: 'white',
          padding: '0 10px',
          wordBreak: 'break-word',
          fontWeight: "400",
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
        placeholder="Content goes here..."
      />
    </div>
  );
};
export default RichTextArea;

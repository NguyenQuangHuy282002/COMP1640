import { useState, useRef } from "react";
import  ReactQuill  from  "react-quill";
import  "react-quill/dist/quill.snow.css";
const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['clean'],                                        // remove formatting button
    ['link', 'image', 'video']       
  ],
};

export default function RichTextArea (props) {
  return <ReactQuill modules={modules} theme="snow" onChange={ (newContent) => props.setContent(newContent)} placeholder="Content goes here..." />;
};

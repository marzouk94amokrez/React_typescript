import React, { useMemo, useState } from "react";
import dompurify from 'dompurify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

/** <b>Composant d'édition d'un champ de type html</b>*/
export default function HtmlTextEdit({ record, fieldName, onUpdate, fieldClassName }) {
  const defaultValue = useMemo(() => {
    const r = record || {}
    const html = r[fieldName] || ''

    return dompurify.sanitize(html, { FORCE_BODY: true, FORBID_TAGS: ['input'], ALLOWED_ATTR: ['style', 'class'] })
  }, [record, fieldName]);


  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean']
    ]
  }
  const [value, setValue] = useState(defaultValue || '');

  return (
    <div className={`w-full html-renderer ${fieldClassName ? fieldClassName : ''}`}>
      <ReactQuill modules={modules} theme="snow" value={value}
        onChange={
          (event) => {
            setValue(event);

            if (onUpdate) {
              onUpdate({ [fieldName]: event });
            }
          }
        } />
      </div>
    )
}

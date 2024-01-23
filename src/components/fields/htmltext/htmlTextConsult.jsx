import { useMemo } from "react";
import dompurify from 'dompurify';
import "./html.scss";

/** <b>Composant de consultation d'un champ de type html</b>*/
export default function HtmlTextConsult({ record, fieldName }) {
  const value = useMemo(() => {
    const r = record || {}
    const html = r[fieldName] || ''

    return dompurify.sanitize(html, { FORCE_BODY: true, FORBID_TAGS: ['input'], ALLOWED_ATTR: ['style', 'class'] })
  }, [record, fieldName]);
  return (
    <div className="p-1 html-renderer" dangerouslySetInnerHTML={{ __html: value }}></div>
  )
}

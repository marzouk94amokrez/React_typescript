import { useOutlet } from "react-router";
import { Link } from "react-router-dom";

export default function Test() {
  const outlet = useOutlet();

  return outlet ? (
    outlet
  ) : (
    <div className="flex flex-col w-full h-full overflow-y-auto">
      <h1 className="text-[var(--color-princ)] pb-8 font-black text-[1.5rem]">
        Liste des pages de tests
      </h1>
      <ul>
        <li className="before:content-['\2192'] before:pr-2">
          <Link to={`referencing`}>Demande de référencement</Link>
        </li>
        <li className="before:content-['\2192'] before:pr-2">
          <Link to={`checkReferencing`}>Suivi de référencement</Link>
        </li>
        <li className="before:content-['\2192'] before:pr-2">
          <Link to={`reference-drop`}>Test Dropzone référence</Link>
        </li>
        <li className="before:content-['\2192'] before:pr-2">
          <Link to={`invoice-drop`}>Test Dropzone facture</Link>
        </li>
        <li className="before:content-['\2192'] before:pr-2">
          <Link to={`logs`}>Journal logs</Link>
        </li>
      </ul>
    </div>
  );
}

import { useOutlet } from "react-router";
import { Link } from "react-router-dom";

export default function TestFields(): JSX.Element {
  const outlet = useOutlet();

  return (
    <div className="w-full">
      <h1 className="text-3xl font-extrabold text-[color:var(--color-princ)] mb-4">
        <Link to={`/test/fields`}>Fields test</Link>
      </h1>
      {outlet ? (
        outlet
      ) : (
        <ul>
          <li className="before:content-['\2192'] before:pr-2">
            <Link to={`filters`}>Fields (FieldViewType.FILTER)</Link>
          </li>
        </ul>
      )}
    </div>
  );
}

import { Link } from "react-router-dom";
export function Menu() {
  return (
    <nav className="flex gap-4 p-10 bg-gray-200 rounded-lg">
      <Link className="bg-blue-500 text-white p-10 m-5 rounded" to="/">Temperature Practice</Link>
      <Link className="bg-blue-500 text-white p-10 m-5 rounded" to="/trello">Mini Trello</Link>
    </nav>
  );
}

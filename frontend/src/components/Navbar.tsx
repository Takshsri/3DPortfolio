import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between p-5 bg-black text-white">

      <h1 className="text-xl font-bold">Maya Portfolio</h1>

      <div className="flex gap-6">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/contact">Contact</Link>
      </div>

    </nav>
  );
}
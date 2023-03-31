import { Link } from "react-router-dom"
import './header.css';
import logo from './logo.png'

const Header = () => {
  return (
    <div className="header">
      <Link className="title" to="/">University Course Graph and Search</Link>
      <Link className="subLink" to="/graph">Graph</Link>
      <Link className="subLink" to="/course-search">Course Search</Link>
      <img className="logo" src={logo} />
    </div>
  );
}

export default Header;
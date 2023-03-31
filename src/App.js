import './App.css';
import { useEffect } from 'react';
import Header from './components/header/header'
import { Link } from "react-router-dom"

const App = () => {

  useEffect(() => {
    document.title = "Home"
  }, [])

  return (
    <div className="container">
      <Header />
      <div className="mainContainer">
        <div className="circleButtonContainer">
          <Link className="circleButton" to="/graph">
            <img className="circleButton" src="Graph_SVG_Base.svg" alt="Course Search"  height="400" onMouseOver={e => (e.currentTarget.src = "Graph_SVG_Clicked.svg")} onMouseOut={e => (e.currentTarget.src = "Graph_SVG_Base.svg")}/>
          </Link>
        </div>
        <div className="circleButtonContainer">
          <Link className="circleButton" to="/course-search">
            <img className="circleButton" src="CourseSearch_SVG_Base.svg" alt="Course Search"  height="400" onMouseOver={e => (e.currentTarget.src = "CourseSearch_SVG_Clicked.svg")} onMouseOut={e => (e.currentTarget.src = "CourseSearch_SVG_Base.svg")}/>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;

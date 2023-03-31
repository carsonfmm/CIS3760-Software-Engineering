import React from 'react';
import './courseItem.css'

const Seasons = ({ seasons }) => {
  // creating the correct html element depending on seasons passed into the component
  const seasonItems = seasons.map((season, i) => {
    if (season == "F") {
      return <div key={i} className="tag fallTag">Fall</div>
    } else if (season == "W") {
      return <div key={i} className="tag winterTag">Winter</div>
    } else if (season == "S") {
      return <div key={i} className="tag summerTag">Summer</div>
    }
  });

  return (
    <div className="seasonsList">
      {seasonItems}
    </div>
  );
}

export default Seasons;
import React from 'react';
import './courseSearch.css';
import { ClipLoader } from 'react-spinners';
import CourseItem from './courseItem';
import Masonry from 'react-masonry-css';

const breakpointColumnsObj = {
  default: 3,
  1500: 2,
  1000: 1,
};


const CourseDisplay = ({loading, searchResults, univ}) => {
  let list = [];

  // creating a list of CourseItem components
  for (const [index, course] of searchResults.entries(1)) {
    const season = course.season
    let seasons = [];
    if (season != undefined) {
      seasons = season.split(" ");
    }
    // predefining the item
    const element = <CourseItem 
      key={index}
      name={course.name} 
      title={course.title} 
      seasons={seasons} 
      weight={course.weight} 
      desc={course.desc}
      prereq={course.prereq_text} 
    />

    list.push(element);
  }

  return (
    <div className="courseDisplay">
      <div className="courseSearchContainer">
        {loading ? 
          <div className="loadingBar">
            <ClipLoader color={"#C51C1C"} size={50} />
          </div> :
          <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
            {list}
          </Masonry>
        }
      </div>
    </div>
  );
}

export default CourseDisplay;
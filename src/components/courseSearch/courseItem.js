import React from 'react';
import './courseItem.css';
import Seasons from './seasons'

const CourseItem = ({name, title, seasons, weight, desc, prereq}) => {
  return (
    <div className="course">
      <h1 className="courseCode">{name}</h1>
      <span className="courseTitle">{title}</span>
      <Seasons seasons={seasons} />
      <div className="tag creditTag">{weight} Credits</div>
      <p className="courseDesc">{desc}</p>
      <span className="coursePrereq"><strong>Prerequisite(s):</strong> {prereq}</span>
    </div>
  );
}

export default CourseItem;
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import CourseSearch from "./routes/courseSearch"
import Graph from './routes/graph'

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="graph" element={<Graph />} />
      <Route path="course-search" element={<CourseSearch />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

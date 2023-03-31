import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import '../components/courseSearch/courseSearch.css'
import Header from '../components/header/header';
import SelectColumn from '../components/courseSearch/selectColumn';
import CourseDisplay from '../components/courseSearch/courseDisplay';

const CourseSearch = () => {
  const [disabledSelect, setDisabledSelect] = useState(false);
  const [selectedUniv, setSelectedUniv] = useState({value: 'guelph', label: 'Guelph'});
  const [subjects, setSubjects] = useState([]);
  const [guelphSubjects, setGuelphSubjects] = useState([]);
  const [carletonSubjects, setCarletonSubjects] = useState([]);
  const [waterlooSubjects, setWaterlooSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [selectedYear, setSelectedYear] = useState([]);
  const [selectedWeight, setSelectedWeight] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState([]);

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    document.title = "Course Search";
    // upon page load open these files and store the data as state
    const getCourses = async () => {
      fetch('/guelphSubjects.txt').then((r) => r.text()).then(text => {
        // splitting the text into an array to store in state

        const subjectSelect = (text.split('\n').map((sub) => {
          return {"value": sub, "label": sub};
        }));
        setGuelphSubjects(subjectSelect);
        setSubjects(subjectSelect);
      })

      fetch('/carletonSubjects.txt').then((r) => r.text()).then(text => {
        // splitting the text into an array to store in state
        setCarletonSubjects(text.split('\n').map((sub) => {
          return {"value": sub, "label": sub};
        }));
      })

      fetch('/waterlooSubjects.txt').then((r) => r.text()).then(text => {
        // splitting the text into an array to store in state
        setWaterlooSubjects(text.split('\n').map((sub) => {
          return {"value": sub, "label": sub};
        }));
      })
    }

    // async function to fetch data from the course-search endpoint
    const getSearchResults = async () => {
      let url = "https://131.104.49.101/api/course-search/"

      const response = await axios.get(url + selectedUniv.value);

      setLoading(false);
      // set state with data
      setSearchResults(response.data)
    }

    // call the async function, log if error
    getCourses().catch(console.error);
    getSearchResults().catch(console.error);
  }, [])

  const buttonOnClick = () => {
    // recreating the array with only the value
    // format previously = {value: x, label: y}
    // map just gets x 
    const params = {
      subject: selectedSubject.map(subject => subject.value),
      level: selectedYear.map(year => year.value),
      weight: selectedWeight.map(weight => weight.value),
      season: selectedSeason.map(season => season.value),
    }

    console.log(selectedUniv, selectedSubject, selectedYear, selectedWeight, selectedSeason);

    // async function to fetch data from the course-search endpoint
    const getSearchResults = async () => {
        // clearing the screen
        setSearchResults([]);
        // show loading bar
        setLoading(true);

        let url = "https://131.104.49.101/api/course-search/"

        const response = await axios.get(url + selectedUniv.value, {params});

        // remove loading bar
        setLoading(false);
        // set state with data
        setSearchResults(response.data);
    }

    getSearchResults().catch(console.error);
  }

  const uniOnChange = (uni) => {
    setSelectedSubject([]);
    setSelectedYear([]);
    setSelectedWeight([]);
    setSelectedSeason([]);

    if (uni.value === "guelph") {
      setDisabledSelect(false);
      setSubjects(guelphSubjects);
    } else if (uni.value === "waterloo") {
      setDisabledSelect(true);
      setSubjects(waterlooSubjects);
    } else if(uni.value === "carleton") {
      setDisabledSelect(true);
      setSubjects(carletonSubjects);
    }
    setSelectedUniv(uni);
    //setSubjects(null);
  }

  return (
    <div className="mainCourseContainer">
      <Header />
      <div className="courseContainer">
        <SelectColumn 
          univOnChange={uniOnChange}
          selectedValues={[selectedUniv, selectedSubject, selectedYear, selectedWeight, selectedSeason]}
          subjects={subjects}
          subjectOnChange={setSelectedSubject}
          yearOnChange={setSelectedYear}
          weightOnChange={setSelectedWeight}
          seasonOnChange={setSelectedSeason}
          buttonOnClick={buttonOnClick}
          disabledSelect={disabledSelect}
        />
        <CourseDisplay loading={loading} searchResults={searchResults} univ={selectedUniv}/>
      </div> 
    </div>
  )
}

export default CourseSearch;
import React from 'react';
import './courseSearch.css'
import Select from 'react-select';

const yearOptions = [
  {value: '1', label: '1'}, {value: '2', label: '2'},
  {value: '3', label: '3'}, {value: '4', label: '4'},
];

const seasonOptions = [
  {value: 'F', label: 'Fall'}, {value: 'W', label: 'Winter'}, {value: 'S', label: 'Summer'}
];

const weightOptions = [
  {value: '0.00', label: '0.00'}, {value: '0.25', label: '0.25'}, {value: '0.50', label: '0.50'}, 
  {value: '0.75', label: '0.75'}, {value: '1.00', label: '1.00'}, {value: '1.25+', label: '1.25+'}
];

const univOptions = [
  {value: 'guelph', label: 'Guelph'}, {value: 'waterloo', label: 'Waterloo'}, {value: 'carleton', label: 'Carleton'}
];


const SelectColumn = ({univOnChange, selectedValues, subjects, subjectOnChange, yearOnChange, 
  weightOnChange, seasonOnChange, buttonOnClick, disabledSelect}) => {

  const selectedUni = selectedValues[0];
  const selectedSubject = selectedValues[1];
  const selectedYear = selectedValues[2];
  const selectedWeight = selectedValues[3];
  const selectedSeason = selectedValues[4];

  return (
    <div className="filtersDisplay">
      <Select
        className="filterSelect"
        placeholder="University..." 
        options={univOptions}
        onChange={univOnChange}
        value={selectedUni}
      />
      <Select 
        className="filterSelect"
        placeholder="Subject..." 
        options={subjects}
        onChange={subjectOnChange}
        isMulti
        value={selectedSubject}
      />
      <Select 
        className="filterSelect"
        placeholder="Year..." 
        options={yearOptions}
        onChange={yearOnChange}
        isMulti
        value={selectedYear}
      />
      <Select
        className="filterSelect"
        placeholder="Weight..."
        options={weightOptions}
        onChange={weightOnChange}
        isMulti
        value={selectedWeight}
      />
      <Select
        className="filterSelect"
        placeholder="Season..." 
        options={seasonOptions}
        onChange={seasonOnChange}
        isDisabled={disabledSelect}
        isMulti
        value={selectedSeason}
      />
      <button className="searchButton" onClick={buttonOnClick}>Search Course</button>
    </div>
  );
}

export default SelectColumn;
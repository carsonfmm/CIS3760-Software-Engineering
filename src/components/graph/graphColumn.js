import './graphUI.css'
import React from 'react';
import Select from 'react-select';

const universitys = [
  { value: 'guelph', label: 'Guelph' },
  { value: 'carleton', label: 'Carleton' },
  { value: 'waterloo', label: 'Waterloo' },
];

const GraphColumn = ({uniOnChange, selectedSubject, setSelectedSubject, 
  selectedDegree, setSelectedDegree, disabledSelect, subjects, uniSelect, 
  guelphMajors, buttonClick, majorButtonClick}) => {

  const getSubjectData = () => {
    if (uniSelect == "guelph")
      return subjects[0];
    else if (uniSelect == "carleton")
      return subjects[1];
    else if (uniSelect == "waterloo")
      return subjects[2];
    else
      return null;
  }

  return (
    <div className="optionsContainer">
      <div className="subjectSearch">
        <span className="graphTitleText">Search by subject:</span>
        <Select
          className="select"
          placeholder="University..."
          options={universitys}
          onChange={uniOnChange}
        />
        <Select
          className="select"
          placeholder="Courses..."
          value={selectedSubject == null ? null : { label: selectedSubject, value: selectedSubject }}
          options={getSubjectData()}
          isDisabled={disabledSelect}
          onChange={(subj) => setSelectedSubject(subj.value)}
        />
        <button className="subjectButton" onClick={buttonClick}>Create Graph</button>
      </div>
      <div className="subjectSearch">
        <span className="graphTitleText">Search by degree:</span>
        <Select
          className="select"
          placeholder="University..."
          value={{ value: 'guelph', label: 'Guelph' }}
        />
        <Select
          className="select"
          placeholder="Courses..."
          options={guelphMajors}
          onChange={setSelectedDegree}
        />
        <button className="majorButton" onClick={majorButtonClick}>Create Graph</button>
      </div>
    </div>
  )
}

export default GraphColumn;
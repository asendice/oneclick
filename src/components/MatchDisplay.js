import React from "react";
import "../css/MatchDisplay.css";
import { BiError } from "react-icons/bi";
import { CSVLink } from "react-csv";

const MatchDisplay = ({ headers, errorRows, dataLength }) => {
  return (
    <div className="match-display">
      <div className="display-item">
        <BiError className="display-item-icon" />
        <h3>{errorRows.length} rows are missing a value</h3>
        <CSVLink style={{textDecoration: "none"}} data={errorRows} className="export-button" filename="onboardingErrors">
          Export Rows
        </CSVLink>
      </div>
    </div>
  );
};

export default MatchDisplay;

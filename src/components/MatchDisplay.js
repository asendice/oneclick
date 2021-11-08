import React from "react";
import "../css/MatchDisplay.css";
import { BiError, BiCheck } from "react-icons/bi";
import { VscTable } from "react-icons/vsc";
import { CSVLink } from "react-csv";

const MatchDisplay = ({ errorRows, dataLength }) => {
  return (
    <div className="match-display">
      <div className="display-container">
        <div className="display-item">
          <VscTable className="display-item-icon" />
          <h3>
            {dataLength - errorRows.length} / {dataLength} rows are being
            accepted
          </h3>
        </div>
        <div className="display-item">
          <BiError className="display-item-icon" />
          <h3>{errorRows.length} rows are missing a value</h3>
        </div>
        <div className="display-item">
          <BiCheck className="display-item-icon" />
          <h3>X % of your headers are matched</h3>
        </div>
      </div>
      <CSVLink
        style={{ textDecoration: "none" }}
        data={errorRows}
        className="export-button"
        filename="onboardingErrors"
      >
        Export Rows
      </CSVLink>
    </div>
  );
};

export default MatchDisplay;

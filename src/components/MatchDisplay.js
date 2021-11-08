import React from "react";
import "../css/MatchDisplay.css";
import { BiError, BiCheck } from "react-icons/bi";
import { VscTable } from "react-icons/vsc";
import { CSVLink } from "react-csv";
import { roundPercent } from "../utils/auth";

const MatchDisplay = ({ headers, errorRows, dataLength }) => {
  const unMatched = headers.filter((header) => header.matchedWith.length === 0);

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
          <h3>{errorRows.length} rows are missing value(s)</h3>
          <CSVLink
            style={{ textDecoration: "none" }}
            data={errorRows}
            className="trove-button"
            filename="onboardingErrors"
          >
            Export Rows
          </CSVLink>
        </div>
        <div className="display-item">
          <BiCheck className="display-item-icon" />
          <h3>
            {roundPercent(unMatched.length, headers.length)} % of your headers
            matched
          </h3>
        </div>
      </div>
    </div>
  );
};

export default MatchDisplay;

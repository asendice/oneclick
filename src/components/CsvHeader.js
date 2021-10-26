import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import "../css/CsvHeader.css";
import LoadingSpinner from "./LoadingSpinner";

const CsvHeader = ({ header }) => {
  return (
    <div className="csv-header">
      <div className="csv-header-table">
        <h1>{header.name}</h1>
        {header.values.slice(0, 3).map((item, index) => {
          return (
            <div key={index} className="cell">
              {item}
            </div>
          );
        })}
      </div>
      <div className="csv-results">
        {/* {!header.headerMatch && <LoadingSpinner />} */}
        {header.headerMatch && header.headerMatch === true ? (
          <div className="results-header">
            {" "}
            <FaCheckCircle />
            <h1>Matched</h1>
          </div>
        ) : header.headerMatch === false ? (
          <h4>Failed </h4>
        ) : (
          ""
        )}
        <div></div>
      </div>
    </div>
  );
};

export default CsvHeader;

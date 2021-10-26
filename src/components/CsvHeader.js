import React from "react";
import "../css/CsvHeader.css";

const CsvHeader = ({ header }) => {
  return (
    <div className="csv-header">
      <div className="csv-header-container">
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
        {header.headerMatch && header.headerMatch === true ? (
          <h4>Matched</h4>
        ) : header.headerMatch === false ? (
          <h4>Failed </h4>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CsvHeader;

import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { BiError } from "react-icons/bi";
import { MdArrowForwardIos } from "react-icons/md";
import "../css/CsvHeader.css";
import LoadingSpinner from "./LoadingSpinner";

const CsvHeader = ({ header, endHeaders }) => {
  console.log(header, "header");
  return (
    <div className="csv-header">
      <div className="csv-table">
        <div className="table-header">
          <h4>{header.name}</h4>
          <MdArrowForwardIos />
          <div></div>
        </div>

        {header.values.slice(2, 5).map((item, index) => {
          return (
            <div key={index} className="cell">
              <div className="cell-index">{index + 2}</div>
              <p>{item}</p>
            </div>
          );
        })}
      </div>
      <div className="csv-results">
        {header.headerMatch && header.headerMatch === true ? (
          <div className="results">
            <FaCheckCircle style={{ fontSize: "1.2rem" }} />
            <h1>Header Matched</h1>
          </div>
        ) : (
          <div className="results error">
            <h4>Header Failed </h4>
          </div>
        )}
        {header.headerValues && header.headerValues.match === true ? (
          <div className="results">
            <FaCheckCircle style={{ fontSize: "1.2rem" }} />
            <h1> Values Confirmed</h1>
          </div>
        ) : (
          <div className="results error">
            <BiError style={{ fontSize: "1.6rem" }} />
            <h1>{header.headerValues.errors.length} Value Errors</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default CsvHeader;

import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { BiError, BiX, BiChevronDown } from "react-icons/bi";
import "../css/CsvHeader.css";
import { roundPercent } from "../utils/auth";
import LoadingSpinner from "./LoadingSpinner";

const CsvHeader = ({ header, endHeaders, updateMatchedHeader }) => {
  const [active, setActive] = useState(false);

  // const filteredHeaders = endHeaders.filter((item) =>
  //   item.name.includes(header.name)
  // );

  return (
    <div id="csv-header" className="csv-header">
      <div className="csv-table">
        <div className="table-header">
          <div className="table-header-left">
            <h4>{header.name}</h4>
          </div>
          <div className="table-header-right">
            <div className="table-header-right-content">
              <p>
                {header.headerMatch.match
                  ? header.headerMatch.name
                  : "Lookup matching fields"}
              </p>
              <div
                className=""
                onClick={() => {
                  setActive(!active);
                }}
              >
                <BiX />
                |
                <BiChevronDown />
              </div>
            </div>
            {!header.headerMatch.match && (
              <div
                id="drop-down"
                className="drop-down"
                style={{ display: `${active ? "block" : "none"}` }}
              >
                {endHeaders.map((item, index) => {
                  return (
                    <div
                      onClick={() => updateMatchedHeader(header, item.name)}
                      key={index}
                      className="drop-down-item"
                    >
                      {item.name}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
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
        {header.headerMatch && header.headerMatch.match === true ? (
          <div className="results">
            <FaCheck className="small-check-icon" />
            <h1>
              Matched to the <p>{header.headerMatch.name}</p> field.{" "}
            </h1>
          </div>
        ) : (
          <div className="results error-text">
            <BiError style={{ fontSize: "1.4rem" }} />
            <h1>Unable to automatically match</h1>
          </div>
        )}
        {header.headerValues && header.headerValues.match === true ? (
          <div className="results">
            <FaCheck className="small-check-icon" />
            <h1>100% of your rows have a value for this column</h1>
          </div>
        ) : (
          <div className="results error-text">
            <BiError style={{ fontSize: "1.4rem" }} />
            <h1>
              {roundPercent(
                header.headerValues.errors.length,
                header.values.length
              )}
              % of your rows have a value for this column
            </h1>
          </div>
        )}
        <div className="results-button-container">
          {header.headerMatch.match && header.headerValues.match && (
            <div className="confirm button">Confirm matching</div>
          )}
          {!header.headerValues.match && (
            <div className="error button">Fix errors</div>
          )}
          <div className="ignore button">Ignore this column</div>
        </div>
      </div>
    </div>
  );
};

export default CsvHeader;

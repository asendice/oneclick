import React, { useState, useEffect } from "react";
import "../css/CsvHeader.css";
import { FaCheck } from "react-icons/fa";
import { BiError, BiX, BiChevronDown } from "react-icons/bi";
import { roundPercent } from "../utils/auth";
import LoadingSpinner from "./LoadingSpinner";

const CsvHeader = ({
  header,
  headers,
  confirmHeader,
  updateHeaderName,
  dropDownData,
}) => {
  const [active, setActive] = useState(false);
  const [selection, setSelection] = useState("");


  return (
    <div id="csv-header" className="csv-header">
      <div className="csv-table">
        <div className="table-header">
          <div className="table-header-left">
            <h4>{header.name}</h4>
          </div>
          <div className="arrow-right"></div>
          <div className="table-header-right">
            <div
              className="table-header-right-content"
              onClick={() => {
                setActive(!active);
              }}
            >
              <p>
                {header.matchedWith ? header.matchedWith : selection ? selection : "Lookup For Matching Fields  "}
              </p>
              <div className="">
                {/* <BiX />
                | */}
                <BiChevronDown />
              </div>
            </div>
            <div
              id="drop-down"
              className="drop-down"
              style={{ display: `${active ? "block" : "none"}` }}
            >
              {dropDownData.map((item, index) => {
                return (
                  <div
                    onClick={() => {
                      setSelection(item.name);
                      // updateHeaderName(header, item.name, header.index);
                      setActive(!active);
                    }}
                    key={index}
                    className="drop-down-item"
                  >
                    {item.name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {header.values.slice(1, 4).map((item, index) => {
          return (
            <div key={index} className="cell">
              <div className="cell-index">{index + 1}</div>
              <p>{item}</p>
            </div>
          );
        })}
      </div>
      <div className="csv-results">
        {header.matchedWith !== "" ? (
          <div className="results">
            <FaCheck className="small-check-icon" />
            <h1>
              Matched to the <p>{header.matchedWith}</p> field{" "}
            </h1>
          </div>
        ) : (
          <div className="results error-text">
            <BiError style={{ fontSize: "1.4rem" }} />
            <h1>Unable to automatically match</h1>
          </div>
        )}
        {header.confirmed ? (
          <div className="results">
            <FaCheck className="small-check-icon" />
            <h1>Header Confirmed</h1>
          </div>
        ) : !header.confirmed && header.matchedWith.length > 0 ? (
          <div className="results-button-container">
            <div
              className="confirm button"
              onClick={() => confirmHeader(header, headers.indexOf(header))}
            >
              Confirm Matching
            </div>
          </div>
        ) : (
          <div> </div>
        )}
      </div>
    </div>
  );
};

export default CsvHeader;

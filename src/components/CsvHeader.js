import React, { useState, useEffect, useRef } from "react";
import "../css/CsvHeader.css";
import { FaCheck } from "react-icons/fa";
import { BiError, BiChevronDown } from "react-icons/bi";

const CsvHeader = ({ header, headers, confirmHeader, dropDownData }) => {
  const [active, setActive] = useState(false);
  const [selection, setSelection] = useState(header.matchedWith);
  const dropDownRef = useRef();

  useEffect(() => {
    const outsideClick = (e) => {
      if (
        active &&
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target)
      ) {
        setActive(false);
      }
    };
    document.addEventListener("mousedown", outsideClick);
    return () => {
      // cleans up the eventlistener
      document.removeEventListener("mousedown", outsideClick);
    };
  }, [active]);

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
                {header.matchedWith
                  ? header.matchedWith
                  : selection
                  ? selection
                  : "Lookup For Matching Fields  "}
              </p>
              <div className="">
                <BiChevronDown />
              </div>
            </div>
            {!header.confirmed && (
              <div
                ref={dropDownRef}
                id="drop-down"
                className="drop-down"
                style={{ display: `${active ? "block" : "none"}` }}
              >
                {dropDownData.map((item, index) => {
                  return (
                    <div
                      onClick={() => {
                        setSelection(item.name);
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
            )}
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
        {selection.length > 0 ? (
          <div className="results">
            <FaCheck className="small-check-icon" />
            <h1>
              Matched to the <p>{selection}</p> field{" "}
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
        ) : !header.confirmed && selection.length > 0 ? (
          <div className="results-button-container">
            <div
              className="confirm button"
              onClick={() => {
                header.matchedWith = selection;
                confirmHeader(header, headers.indexOf(header));
              }}
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

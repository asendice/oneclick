import React, { useState, useEffect } from "react";
import "../css/CsvHeader.css";
import FixModal from "./FixModal";
import { FaCheck } from "react-icons/fa";
import { BiError, BiX, BiChevronDown } from "react-icons/bi";
import { roundPercent } from "../utils/auth";
import LoadingSpinner from "./LoadingSpinner";

const CsvHeader = ({
  header,
  endHeaders,
  updateMatchedHeader,
  setSelectedHeader,
  selectedHeader,
  data,
}) => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [errorData, setErrorData] = useState([]);

  useEffect(() => {
    const arrOfErrorIndex = header.values.reduce((array, item, index) => {
      if (item === "") array.push(index);
      return array;
    }, []);
    const arrOfRowsWithError = arrOfErrorIndex.map((i) => {
      data[i].i = i;
      return data[i];
    });
    console.log(arrOfRowsWithError, "asdasd ")
    setErrorData(arrOfRowsWithError);
  }, []);

  const onFixErrorClick = () => {
    setSelectedHeader(header);
    setOpen(!open);
  };

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
            <div className="error button" onClick={() => onFixErrorClick()}>
              Fix errors
            </div>
          )}
          <div className="ignore button">Ignore this column</div>
        </div>
      </div>
      <FixModal open={open} setOpen={setOpen} header={header} errorData={errorData}  />
    </div>
  );
};

export default CsvHeader;

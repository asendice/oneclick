import React from "react";
import "../css/MatchDisplay.css";
import XLSX from "xlsx";
import { BiError, BiCheck } from "react-icons/bi";
import { VscTable } from "react-icons/vsc";
import { CSVLink } from "react-csv";
import { roundPercent } from "../utils/auth";

const MatchDisplay = ({ headers, errorRows, dataLength, file }) => {
  const unMatched = headers.filter((header) => header.matchedWith.length === 0);
  const exportXlsx = () => {
    const ws = XLSX.utils.json_to_sheet(errorRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `Sheet1`);
    XLSX.writeFile(
      wb,
      `${file.name.slice(0, file.name.length - 5)}_missing_values.xlsx`
    );
  };

  return (
    <div className="match-display">
      <div className="display-container">
        <div className="display-item">
          <VscTable className="display-item-icon" />
          {headers.length > 0 ? (
            <h4>
              {dataLength - errorRows.length} / {dataLength} rows are being
              accepted
            </h4>
          ) : (
            <h4>xxxx rows are being accepted</h4>
          )}
        </div>
        <div className="display-item">
          <BiError className="display-item-icon" />
          {headers.length > 0 ? (
            <h4>{errorRows.length} rows are missing value(s)</h4>
          ) : (
            <h4>xxx rows are missing value(s)</h4>
          )}
          {file.type === "text/csv" ? (
            <CSVLink
              style={{ textDecoration: "none" }}
              data={errorRows}
              className="trove-button"
              filename={`${file.name.slice(
                0,
                file.name.length - 4
              )}_missing_values`}
            >
              Export Rows .CSV
            </CSVLink>
          ) : (
            <div className="trove-button" onClick={() => exportXlsx()}>
              Export Rows .XLSX{" "}
            </div>
          )}
        </div>
        <div className="display-item">
          <BiCheck className="display-item-icon" />
          {headers.length > 0 ? (
            <h4>
              {roundPercent(unMatched.length, headers.length)} % of your headers
              matched
            </h4>
          ) : (
            <h4>xxx% of your headers matched</h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchDisplay;

import React from "react";
import "../css/FileDisplay.css";
import CsvHeader from "./CsvHeader";

const FileDisplay = ({ file, data, headers }) => {
  return (
    <div className="file-display">
      <div className="file-header">{file.name}</div>
      {headers.map((header, index) => {
        return <CsvHeader key={index} header={header} />;
      })}
    </div>
  );
};

export default FileDisplay;

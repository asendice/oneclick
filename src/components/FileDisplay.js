import React, { useEffect, useState } from "react";
import "../css/FileDisplay.css";
import CsvHeader from "./CsvHeader";

const FileDisplay = ({ file, data }) => {
  const [headers, setHeaders] = useState([]);
  const [newData, setNewData] = useState([]);

  
  useEffect(() => {
    if (data.length > 0) {
      setHeaders(Object.keys(data[0]));
      console.log(data, "data");
      let newData = [data[1], data[2], data[3]];
      setNewData(newData);

    }
  }, [data]);

  return (
    <div className="file-display">
      <div className="file-header">{file.name}</div>
      {headers.map((header, index) => {
        return (
          <CsvHeader key={index} header={header} newData={newData} />
        );
      })}
    </div>
  );
};

export default FileDisplay;

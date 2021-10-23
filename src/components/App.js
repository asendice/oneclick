import React, { useState } from "react";
import "../css/App.css";
import FileDisplay from "./FileDisplay";
import Upload from "./Upload";
const App = () => {
  const [file, setFile] = useState();
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);

  const handleCSV = (str) => {
    const headers = str.slice(0, str.indexOf("\n")).split(",");
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");
    setHeaders(headers);
    const arr = rows.map((row) => {
      const values = row.split(",");
      const eachObject = headers.reduce((obj, header, i) => {
        obj[header] = values[i];
        return obj;
      }, {});
      return eachObject;
    });
    setData(arr);
  };

  console.log(data, "data")

  return (
    <div className="app">
      {file ? (
        <FileDisplay file={file} headers={headers} data={data} />
      ) : (
        <Upload setFile={setFile} handleCSV={handleCSV} />
      )}
    </div>
  );
};

export default App;

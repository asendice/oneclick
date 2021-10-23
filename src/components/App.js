import React, { useState } from "react";
import "../css/App.css";
import Match from "./Match";
import Upload from "./Upload";
import Progress from "./Progress";
const App = () => {
  const [file, setFile] = useState();
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [frame, setFrame] = useState("Upload");

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

  console.log(data, "data");

  return (
    <div className="app">
      <div className="header">
        <Progress frame={frame} />
      </div>
      <div className="content">
        {frame === "Upload" && (
          <Upload setFile={setFile} handleCSV={handleCSV} setFrame={setFrame} />
        )}
        {frame === "Match" && (
          <Match file={file} headers={headers} data={data} />
        )}
     
      </div>
    </div>
  );
};

export default App;

import React, { useState } from "react";
import "../css/App.css";
import Match from "./Match";
import Upload from "./Upload";
import Progress from "./Progress";
import { MdArrowBack } from "react-icons/md";
const App = () => {
  const [file, setFile] = useState();
  const [data, setData] = useState([]);
  const [frame, setFrame] = useState("Upload");

  const handleCSV = (str) => {
    const headers = str.slice(0, str.indexOf("\n")).split(",");
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");
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
        {frame === "Match" ? (
          <MdArrowBack
            className="back-arrow"
            onClick={() => setFrame("Upload")}
          />
        ) : (
          <div></div>
        )}
        <Progress frame={frame} />
      </div>
      <div className="content">
        {frame === "Upload" && (
          <Upload setFile={setFile} handleCSV={handleCSV} setFrame={setFrame} />
        )}
        {frame === "Match" && <Match file={file} data={data} />}
      </div>
    </div>
  );
};

export default App;

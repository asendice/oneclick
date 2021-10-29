import React, { useState } from "react";
import "../css/App.css";
import Match from "./Match";
import Upload from "./Upload";
import Progress from "./Progress";
import { MdArrowBack } from "react-icons/md";
import { BrowserRouter, Route, Link } from "react-router-dom";
const App = () => {
  const [file, setFile] = useState();
  const [data, setData] = useState([]);
  const [frame, setFrame] = useState("Upload");

  const handleCSV = (str) => {
    const headers = str.slice(0, str.indexOf("\n")).split(",");
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");
    console.log(rows, "rwos");
    const arr = rows.map((row) => {
      const values = row.split(`","`);
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
    <BrowserRouter>
      <div className="app">
        <div className="header">
          {frame === "Match" ? (
            <Link
              to="/"
              className="back-arrow"
              onClick={() => setFrame("Upload")}
            >
              <MdArrowBack />
            </Link>
          ) : (
            <div></div>
          )}
          <Progress frame={frame} />
        </div>
        <div className="content">
          <Route
            exact
            path="/"
            render={() => (
              <Upload
                setFile={setFile}
                handleCSV={handleCSV}
                setFrame={setFrame}
              />
            )}
          />
          <Route
            exact
            path="/match"
            render={() => <Match file={file} data={data} />}
          />
          {/* {frame === "Upload" && (
          <Upload setFile={setFile} handleCSV={handleCSV} setFrame={setFrame} />
        )}
        {frame === "Match" && <Match file={file} data={data} />} */}
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;

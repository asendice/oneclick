import React, { useState, useEffect } from "react";
import "../css/App.css";
import axios from "axios";
import Match from "./Match";
import Upload from "./Upload";
import Progress from "./Progress";
import { MdArrowBack } from "react-icons/md";
import { BrowserRouter, Route, Link } from "react-router-dom";
const App = () => {
  const [file, setFile] = useState();
  const [data, setData] = useState([]);
  const [frame, setFrame] = useState("Upload");
  const [backEndHeaders, setBackEndHeaders] = useState([]);

  const handleCSV = (str) => {
    const headers = str.slice(0, str.indexOf("\n")).split(",");
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");
    const arr = rows.map((row) => {
      const values = row.split(`,`);
      const eachObject = headers.reduce((obj, header, i) => {
        obj[header] = values[i];
        return obj;
      }, {});
      return eachObject;
    });
    setData(arr);
  };

  const getBackEndHeaders = async () => {
    await axios
      .get("http://localhost:3000/headers")
      .then((response) => {
        if (!response) {
          console.log("error no response");
        } else {
          return response;
        }
      })
      .then((response) => setBackEndHeaders(response.data));
  };

  useEffect(() => {
    getBackEndHeaders();
  }, []);

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
            render={() => (
              <Match file={file} data={data} setData={setData} backEndHeaders={backEndHeaders} />
            )}
          />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;

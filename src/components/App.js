import React, { useState, useEffect } from "react";
import "../css/App.css";
import axios from "axios";
import Match from "./Match";
import Upload from "./Upload";
import Progress from "./Progress";
import Review from "./Review";
import Footer from "./Footer";
import { MdArrowBack } from "react-icons/md";
import { BrowserRouter, Route, Link } from "react-router-dom";
const App = () => {
  const [file, setFile] = useState();
  const [data, setData] = useState([]);
  const [frame, setFrame] = useState("Upload");
  const [backEndHeaders, setBackEndHeaders] = useState([]);

  console.log(data, "data");

  const updateData = (arr) => {
    let key = Object.keys(arr[0])[0];
    const chosenToUpdate = arr.map((item) => {
      let newData = [...data];
      let i = item.index;
      newData[i][key] = item[key];
      return newData;
    });
    setData(chosenToUpdate[0]);
  };

  const updateHeader = (oldHeader, name) => {
    const checkIt = data.map((obj) => {
      obj[name] = obj[oldHeader];
      delete obj[oldHeader];
      return obj;
    });
    setData(checkIt);
  };

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

  return (
    <div className="app">
      <BrowserRouter>
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
              <Match
                file={file}
                data={data}
                setData={setData}
                backEndHeaders={backEndHeaders}
                updateData={updateData}
                updateHeader={updateHeader}
                setFrame={setFrame}
              />
            )}
          />
          <Route
            exact
            path="/review"
            render={() => <Review file={file} data={data} />}
          />
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;

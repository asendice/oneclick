import React, { useState, useEffect } from "react";
import backendApi from "../apis/backendApi";
import Match from "./Match";
import Upload from "./Upload";
import Progress from "./Progress";
import Review from "./Review";
import Complete from "./Complete";
import Footer from "./Footer";
import { MdArrowBack } from "react-icons/md";
import { BrowserRouter, Route, Link } from "react-router-dom";
const App = () => {
  const [file, setFile] = useState();
  const [data, setData] = useState([]);
  const [frame, setFrame] = useState("Upload");
  const [backEndHeaders, setBackEndHeaders] = useState([]);

  const handleCSV = (str) => {
    const headers = str
      .slice(0, str.indexOf("\n"))
      .split(",")
      .map((header) => header.replace("\r", "").replace(/"/g, ""));
    const rows = str
      .slice(str.indexOf("\n") + 1)
      .split("\n")
      .filter((row) => row.length > 0);
    const arr = rows.map((row) => {
      const values = row.split(",");
      if (values.length > 0) {
        const eachObject = headers.reduce((obj, header, i) => {
          obj[header] = values[i] && values[i].replace("\r", "").replace(/"/g, "");
          return obj;
        }, {});
        return eachObject;
      }
    });
    setData(arr);
  };

  const getBackEndHeaders = async () => {
    await backendApi
      .get("/headers")
      .then((response) => {
        if (response) {
          console.log(response)
          return response;
        } else {
          const error = new Error(`Error ${error.status}: ${error.statusText}`);
          error.response = response;
          throw error;
        }
      })
      .then((response) => setBackEndHeaders(response.data.message));
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
        <Route
          exact
          path="/"
          render={() => (
            <Upload
              setFile={setFile}
              handleCSV={handleCSV}
              setFrame={setFrame}
              setData={setData}
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
              setFrame={setFrame}
            />
          )}
        />
        <Route
          exact
          path="/review"
          render={() => <Review file={file} data={data} setFrame={setFrame} />}
        />
        <Route
          exact
          path="/complete"
          render={() => <Complete file={file} data={data} />}
        />
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;

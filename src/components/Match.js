import React, { useEffect, useState } from "react";
import "../css/Match.css";
import MatchDisplay from "./MatchDisplay";
import CsvHeader from "./CsvHeader";
import { Redirect, Link } from "react-router-dom";

const Match = ({
  file,
  data,
  backEndHeaders,
  updateData,
  updateHeader,
  setFrame,
}) => {
  const [headers, setHeaders] = useState([]);
  const [errorRows, setErrorRows] = useState([]);

  console.log(headers, "headers")
  console.log(errorRows, "errorRows")

  useEffect(() => {
    const rowsWithMissingValues = data.filter((row) => {
      return Object.keys(row).some((prop) => row[prop] === "");
    });
    setErrorRows(rowsWithMissingValues);
  }, [data]);

  useEffect(() => {
    if (data.length > 0) {
      const createHeaders = Object.keys(data[0]).map((header) => {
        const obj = {
          name: header,
          matchedWith: [],
          confirmed: false,
        };
        return obj;
      });
      headerMatch(createHeaders);
    }
  }, [data]);

  const headerMatch = (list) => {
    const matching = list.map((header) => {
      const backendMatch = backEndHeaders.filter((item) => {
        return header.name === item.name || item.altNames.includes(header.name);
      });
      header.matchedWith = backendMatch[0] ? backendMatch[0].name : [];
      return header;
    });
    setHeaders(matching);
  };

  if (file) {
    return (
      <div className="match">
        <div className="match-header">
          <h3>{file.name}</h3> 
        </div>
        <MatchDisplay errorRows={errorRows} dataLength={data.length}/>
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default Match;

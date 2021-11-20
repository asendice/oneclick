import React, { useEffect, useState } from "react";
import MatchDisplay from "./MatchDisplay";
import CsvHeader from "./CsvHeader";
import LoadingHeaders from "./LoadingHeaders";
import { Redirect, Link } from "react-router-dom";

const Match = ({ file, data, backEndHeaders, setData, setFrame }) => {
  const [matched, setMatched] = useState(false);
  const [headers, setHeaders] = useState([]);
  const [errorRows, setErrorRows] = useState([]);
  const [remainingHeaders, setRemainingHeaders] = useState([]);

  useEffect(() => {
    if (headers.length > 0) {
      const unMatched = headers.filter((header) => header.confirmed === false);
      if (unMatched.length === 0) {
        setMatched(true);
      }
      const headerNames = headers.map((header) => header.matchedWith);
      setRemainingHeaders(
        backEndHeaders.filter((item) => !headerNames.includes(item.name))
      );
    }
  }, [headers]);

  useEffect(() => {
    const rowsWithMissingValues = data.filter((row) => {
      return Object.keys(row).some((prop) => row[prop] === "");
    });
    setErrorRows(rowsWithMissingValues);
  }, [data]);

  useEffect(() => {
    if (data.length > 0) {
      const createHeaders = Object.keys(data[0]).map((header, index) => {
        // values might be not necessary
        const values = data.map((row) => {
          return row[header];
        });
        const obj = {
          index: index,
          name: header,
          matchedWith: "",
          confirmed: false,
          values: values,
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
      header.matchedWith = backendMatch[0] ? backendMatch[0].name : "";
      return header;
    });
    setHeaders(matching);
  };

  const confirmHeader = (header, index) => {
    header.name = header.matchedWith;
    header.confirmed = true;
    let arr = [...headers];
    arr.splice(index, 1, header);
    setHeaders(arr);
  };

  const onReviewClick = () => {
    const filteredForErrors = data.filter((row) => !errorRows.includes(row));
    const headerNames = headers.map((header) => header.name);
    const updatedData = filteredForErrors.map((row, index) => {
      Object.keys(row).map((key, index) => {
        if (headerNames[index] !== key) {
          row[headerNames[index]] = row[key];
          delete row[key];
        }
      });
      return row;
    });
    setData(updatedData);
    setFrame("Review");
  };

  if (file) {
    return (
      <div className="match">
        <div className="match-header">
          <h3>{file.name}</h3>
          {matched && (
            <Link
              to="/review"
              style={{ textDecoration: "none", flex: 1 }}
              className="trove-button"
              onClick={() => onReviewClick()}
            >
              Review
            </Link>
          )}
        </div>
        <MatchDisplay
          headers={headers}
          errorRows={errorRows}
          dataLength={data.length}
          file={file}
        />
        <div className="match-main">
          {headers.length > 0 ? (
            headers.map((header, index) => {
              return (
                <CsvHeader
                  key={index}
                  header={header}
                  headers={headers}
                  setHeaders={setHeaders}
                  confirmHeader={confirmHeader}
                  dropDownData={remainingHeaders}
                />
              );
            })
          ) : (
            <LoadingHeaders />
          )}
        </div>
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default Match;

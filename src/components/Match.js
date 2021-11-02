import React, { useEffect, useState } from "react";
import "../css/Match.css";
import CsvHeader from "./CsvHeader";
import { Redirect, Link } from "react-router-dom";

const Match = ({ file, data, backEndHeaders, updateData, updateHeader, setFrame }) => {
  const [headers, setHeaders] = useState([]);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (data.length > 0) {
      let keys = Object.keys(data[0]);
      let newArr = keys.map((header, index) => {
        let values = data.map((item, index) => {
          return item[header];
        });
        let obj = {
          name: header,
          values: values,
        };
        return obj;
      });
      match(newArr);
    }
  }, [data, backEndHeaders]);

  const match = (arr) => {
    const endHeaders = backEndHeaders.map((header) => {
      return header.name;
    });
    const matched = arr.map((item, index) => {
      const values = item.values;
      const valueErrors = values.filter((value, index) => {
        return value.length === 0;
      });
      let obj = {
        name: item.name,
        values: item.values,
        headerMatch: {
          match: endHeaders.includes(item.name),
          name: endHeaders.filter((header) => header.includes(item.name)),
        },
        headerValues: {
          match: valueErrors.length === 0,
          errors: valueErrors,
        },
      };
      return obj;
    });
    setHeaders(matched);
    const notConfirmed = matched.filter((item) => {
      return (
        item.headerValues.match === false || item.headerMatch.match === false
      );
    });
    if (notConfirmed.length === 0) {
      setConfirmed(true);
    }
  };

  if (file) {
    return (
      <div className="match">
        <div className="match-header">
          <h3>{file.name}</h3>
          {confirmed && (
            <Link to="/review">
              <div className="review-button" onClick={() => setFrame("Review")}>Review</div>
            </Link>
          )}
        </div>
        <div className="main">
          {headers
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((header, index) => {
              return (
                <CsvHeader
                  key={index}
                  data={data}
                  headers={headers}
                  header={header}
                  updateHeader={updateHeader}
                  setHeaders={setHeaders}
                  updateData={updateData}
                  dropDownData={backEndHeaders.filter(
                    (item) => !Object.keys(data[0]).includes(item.name)
                  )}
                />
              );
            })}
        </div>
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default Match;

import React, { useEffect, useState } from "react";
import "../css/Match.css";
import CsvHeader from "./CsvHeader";
import { Redirect } from "react-router";

const Match = ({ file, data, backEndHeaders }) => {
  const [headers, setHeaders] = useState([]);

  const updateMatchedHeader = (header, name) => {
    let arr = headers;
    header.name = name;
    const index = headers.findIndex((item) => item === header);
    arr.splice(index, 1, header);
    match(arr);
  };

  const match = (array) => {
    const endHeaders = backEndHeaders.map((header) => {
      return header.name;
    });
    const matched = array.map((item) => {
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
  };

 

  useEffect(() => {
    if (data.length > 0) {
      let headers = Object.keys(data[0]);
      let newArr = headers.map((header, index) => {
        let values = data.map((item, index) => {
          return item[`${header}`];
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

  if (file) {
    return (
      <div className="match">
        <div className="match-header">{file.name}</div>
        <div className="main">
          {headers.map((header, index) => {
            return (
              <CsvHeader
                key={index}
                header={header}
                endHeaders={backEndHeaders}
                updateMatchedHeader={updateMatchedHeader}
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

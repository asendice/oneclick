import React, { useEffect, useState } from "react";
import "../css/Match.css";
import CsvHeader from "./CsvHeader";
import { Redirect } from "react-router";

const Match = ({ file, data, backEndHeaders, updateData, updateHeader }) => {
  const [headers, setHeaders] = useState([]);
  const [selectedHeader, setSelectedHeader] = useState({});
  console.log(headers, "headers");

  useEffect(() => {
    if (data.length > 0) {
      let headers = Object.keys(data[0]);
      let newArr = headers.map((header, index) => {
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

  const match = (array) => {
    console.log(array, "array from match");
    const endHeaders = backEndHeaders.map((header) => {
      return header.name;
    });
    const matched = array.map((item, index) => {
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

  if (file) {
    return (
      <div className="match">
        <div className="match-header">{file.name}</div>
        <div className="main">
          {headers
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((header, index) => {
              return (
                <CsvHeader
                  key={index}
                  data={data}
                  header={header}
                  endHeaders={backEndHeaders}
                  updateHeader={updateHeader}
                  setSelectedHeader={setSelectedHeader}
                  selectedHeader={selectedHeader}
                  updateData={updateData}
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

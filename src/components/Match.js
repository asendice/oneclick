import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Match.css";
import CsvHeader from "./CsvHeader";
import { Redirect } from "react-router";

const Match = ({ file, data }) => {
  const [headers, setHeaders] = useState([]);
  const [backEndHeaders, setBackEndHeaders] = useState([]);

  const updateMatchedHeader = (header, name) => {
    header.name = name;
    const filteredHeaders = headers.filter((item) => item !== header);

    setHeaders([...filteredHeaders, header]);
    console.log(headers, "headers");
    console.log(header, "header");
    console.log(name, "name");
    match(headers);
  };

  const match = (array) => {
    const endHeaders = backEndHeaders.map((header) => {
      return header.name;
    });

    const matched = array.map((item) => {
      const values = item.values.slice(0, item.values.length - 3);
      const valueErrors = values.filter((value, index) => {
        if (value) {
          return value.length < 3;
        } else {
          return null;
        }
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

  useEffect(() => {
    if (data.length > 0) {
      let arr = Object.keys(data[0]);
      let newArr = arr.map((header, index) => {
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

  console.log(headers, "headers");

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

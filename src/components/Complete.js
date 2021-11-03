import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Complete.css";
import { Redirect } from "react-router";

const Complete = ({ data, file }) => {
  const [status, setStatus] = useState();
  const [sentData, setSentData] = useState([]);

  useEffect(() => {
    const postData = async () => {
      await axios
        .post("http://localhost:3000/userdata", data)
        .then((response) => {
          if (response) {
            return response;
          } else {
            console.error("Error, yo shit not be posted");
          }
        })
        .then((response) => {
          setStatus(response.status);
          setSentData(response.data);
          console.log(response, "response");
        });
    };
    postData();
  }, []);

  if (data.length > 0) {
    return (
      <div className="complete">
        <div className="complete-header">
          <h3>{file.name}</h3>
        </div>
        <div className="complete-main">
          {status === 200 || (201 && <h1>Data Post Successful</h1>)}
          <p>{JSON.stringify(sentData)}</p>
        </div>
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default Complete;

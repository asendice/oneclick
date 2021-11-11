import React, { useState } from "react";
import axios from "axios";
import "../css/Complete.css";
import { Redirect } from "react-router";

const Complete = ({ data, file }) => {
  const [status, setStatus] = useState();


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
      });
  };

  if (data.length > 0) {
    return (
      <div className="complete">
        <div className="complete-header">
          <h3>{file.name}</h3>
        </div>
        <div className="complete-main">
          {!status ? (
            <div className="complete-post-button" onClick={() => postData()}>
              Complete Onboarding
            </div>
          ) : (
            <div className=""> Onboard successful!</div>
          )}
        </div>
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default Complete;

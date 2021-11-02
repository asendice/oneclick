import React, { useEffect } from "react";
import axios from "axios";
import "../css/Complete.css";
const Complete = ({ data, file }) => {
  useEffect(() => {
    const postData = async () => {
      const json = JSON.stringify(data);
      console.log(json)
      await axios
        .post("http://localhost:3000/userdata", data)
        .then((response) => {
          if (response) {
            return response;
          } else {
            console.error("Error, yo shit not be posted");
          }
        })
        .then((response) => console.log(response, "successful"));
    };
    postData();
  }, []);

  return (
    <div className="complete">
      <div className="complete-header">
        <h3>{file.name}</h3>
      </div>
    </div>
  );
};

export default Complete;

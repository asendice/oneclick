import React from "react";
import "../css/LoadingHeaders.css";
const LoadingHeaders = () => {
  const arr = [0, 1, 2, 3, 4];
    return (
      arr.map((item, index) => {
        return <div key={index} className="loading-header"></div>;
      })
    )
   
};

export default LoadingHeaders;

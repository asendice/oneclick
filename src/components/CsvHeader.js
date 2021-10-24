import React from "react";
import "../css/CsvHeader.css";

const CsvHeader = ({ header, newData }) => {
  const newArr = newData.map((item) => {
    return item[`${header}`];
  });

  console.log(newArr);

  return (
    <div className="csv-header">
      <div className="csv-header-container">
        <h1>{header}</h1>
        {newArr.map((item, index) => {
          return <div key={index} className="cell">{item}</div>;
        })}
      </div>
    </div>
  );
};

export default CsvHeader;

import React from "react";
import "../css/CsvHeader.css"

const CsvHeader = ({header}) => {

  return (
    <div className="csv-header">
      <h1>{header}</h1>
    </div>
  )

}

export default CsvHeader;
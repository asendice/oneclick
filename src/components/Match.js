import React, {useState, useEffect} from "react";
import "../css/Match.css"
import FileDisplay from "./FileDisplay";


const Match = ({file, headers, data}) => {




  return (
    <div className="match">
      <FileDisplay file={file} headers={headers} data={data} />

    </div>
  )
}


export default Match;
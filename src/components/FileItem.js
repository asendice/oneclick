import React from "react";
import "../css/FileItem.css";
import { BsFileEarmarkCheckFill } from "react-icons/bs";
const FileItem = ({ submit, file }) => {
  console.log(file);

  return (
    <div className="fileItem">
      <BsFileEarmarkCheckFill className="fileIcon" />
      <div className="fileContent">
        <h3>{file.name}</h3>
        <p>{file.size} bytes</p>
      </div>
      <div className="fileButton" onClick={() => submit()}>
        Next
      </div>
    </div>
  );
};

export default FileItem;

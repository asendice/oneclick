import React from "react";
import "../css/FileItem.css";
import { BsFileEarmarkCheckFill, BsFillFileEarmarkXFill } from "react-icons/bs";
import { Link } from "react-router-dom";
const FileItem = ({ submit, file, rejected }) => {

  return (
    <div className="fileItem">
      {!rejected ? (
        <BsFileEarmarkCheckFill className="fileIcon" />
      ) : (
        <BsFillFileEarmarkXFill className="fileIcon rejected" />
      )}
      <div className="fileContent">
        <h3>{file.name}</h3>
        <p>{file.size} bytes</p>
      </div>
      {!rejected ? (
        <Link to="/match" className="fileButton" onClick={() => submit()}>
          Next
        </Link>
      ) : (
        <div className="fileRejected rejected">File Rejected, Only *.csv files are accepted</div>
      )}
    </div>
  );
};

export default FileItem;

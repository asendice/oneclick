import React from "react";
import { byteConverter } from "../utils/auth";
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
        <p>{byteConverter(file.size)}</p>
      </div>
      {!rejected ? (
        <Link style={{textDecoration: "none"}} to="/match" className="fileButton" onClick={() => submit()}>
          Next
        </Link>
      ) : (
        <div className="fileRejected rejected">File Rejected, Only *.csv, *.xlsx, *.xls files are accepted</div>
      )}
    </div>
  );
};

export default FileItem;

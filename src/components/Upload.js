import React, { useEffect, useState } from "react";
import "../css/Upload.css";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";
import FileItem from "./FileItem";

const Upload = () => {
  const [fileNames, setFileNames] = useState([]);
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone();

  const handleCSV = (str) => {
    const headers = str.slice(0, str.indexOf("\n")).split(",");
    console.log(headers, "headers");
  };

  const submit = () => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      const text = e.target.result;
      console.log(text);
      handleCSV(text); // plugged in here
    };
    reader.readAsText(file);
  };

  return (
    <div className="upload">
      <div className="upload-header">
        <h2>Upload .csv file for onboard</h2>
      </div>
      <div
        {...getRootProps(isDragActive)}
        className={`dropzone ${isDragActive && "active-dropzone"} `}
      >
        <input {...getInputProps()} />
        <div
          className={`dropzone-content ${
            isDragActive && "active-dropzone-content"
          } `}
        >
          <FaCloudUploadAlt className="upload-icon" />
          <p>Drag and drop to upload!</p>
        </div>
      </div>
      {acceptedFiles[0] && <FileItem submit={submit} file={acceptedFiles[0]} />}
    </div>
  );
};

export default Upload;

import React, { useEffect, useState } from "react";
import "../css/Upload.css";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";

const Upload = () => {
  const [fileNames, setFileNames] = useState([]);
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone();

  const files = fileNames.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  useEffect(() => {
    setFileNames([...fileNames, acceptedFiles]);
  }, [acceptedFiles]);
  console.log(fileNames);

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
        <div className="dropzone-content">
          <FaCloudUploadAlt className="upload-icon" />
          <p>Drag and drop to upload!</p>
        </div>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </div>
  );
};

export default Upload;

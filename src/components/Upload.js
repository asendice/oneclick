import React from "react";
import "../css/Upload.css";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";
import FileItem from "./FileItem";

const Upload = ({ setFile, handleCSV, setFrame }) => {
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    accept: ".csv",
  });

  const submit = () => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      const text = e.target.result;
      handleCSV(text); // plugged in here
    };
    reader.readAsText(file);
    setFile(acceptedFiles[0]);
    setFrame("Match");
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
        <input {...getInputProps()} accept=".csv" />
        <div
          className={`dropzone-content ${
            isDragActive && "active-dropzone-content"
          } `}
        >
          <FaCloudUploadAlt className="upload-icon" />
          <p>Drag and drop to upload!</p>
          <p style={{ fontStyle: "italic" }}>
            (Only *.csv files will be accepted)
          </p>
        </div>
      </div>
      {acceptedFiles[0] && <FileItem submit={submit} file={acceptedFiles[0]} />}
      {fileRejections[0] && (
        <FileItem file={fileRejections[0].file} rejected={true} />
      )}
    </div>
  );
};

export default Upload;

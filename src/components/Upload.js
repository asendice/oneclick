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
    reader.onload = (e) => {
      const text = e.target.result;
      handleCSV(text);
    };
    reader.readAsText(file);
    setFile(file);
    setFrame("Match");
  };

  return (
    <div className="upload">
      <div className="upload-header">
        <h3>Upload .csv file for onboard</h3>
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
          <p>Drag and drop to upload</p>
          <p>Or</p>
          <div className="upload-file-button">Browse Files</div>
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

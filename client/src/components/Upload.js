import React from "react";
import XLSX from "xlsx";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";
import FileItem from "./FileItem";

const Upload = ({ setFile, handleCSV, setFrame, setData }) => {
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    accept:
      ".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const submit = () => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    if (file.type === "text/csv") {
      reader.onload = (e) => {
        const text = e.target.result;
        handleCSV(text);
      };
      reader.readAsText(file);
    } else {
      reader.onload = (e) => {
        const data = e.target.result;
        const wb = XLSX.read(data, {
          type: "binary",
        });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const wbData = XLSX.utils.sheet_to_json(ws, { raw: false, defval: "" });
        setData(wbData);
      };
      reader.readAsBinaryString(file);
    }
    setFile(file);
    setFrame("Match");
  };

  return (
    <div className="upload">
      <div className="upload-content">
        <div className="upload-header">
          <h3>Upload file for onboard</h3>
        </div>
        <div
          {...getRootProps(isDragActive)}
          className={`dropzone ${isDragActive && "active-dropzone"} `}
        >
          <input {...getInputProps()} accept=".csv, .xlsx, .xls" />
          <div
            className={`dropzone-content ${
              isDragActive && "active-dropzone-content"
            } `}
          >
            <FaCloudUploadAlt className="upload-icon" />
            <p>Drag and drop to upload</p>
            <p>Or</p>
            <div className="trove-button">Browse Files</div>
            <p className="info-text">
              (Only *.csv, *.xlsx, *.xls files will be accepted)
            </p>
          </div>
        </div>
        {acceptedFiles[0] && (
          <FileItem submit={submit} file={acceptedFiles[0]} />
        )}
        {fileRejections[0] && (
          <FileItem file={fileRejections[0].file} rejected={true} />
        )}
      </div>
    </div>
  );
};

export default Upload;

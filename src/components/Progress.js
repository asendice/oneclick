import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import "../css/Progress.css";

import { MdArrowForwardIos } from "react-icons/md";

const Progress = ({ frame }) => {
  return (
    <div className="progress">
      <div className={`progress-item ${frame === "Match" && "completed"}`}>
        {frame === "Match" ? <FaCheckCircle className="check-icon" />  : <div></div>}
        <h3 style={{ color: frame === "Upload" && "#333" }}>Upload</h3>
        <MdArrowForwardIos className="progress-arrow" />
      </div>
      <div className="progress-item">
        {frame === "Review" ? <FaCheckCircle className="check-icon" /> : <div></div>}
        <h3 style={{ color: frame === "Match" && "#333" }}>Match</h3>
        <MdArrowForwardIos className="progress-arrow" />
      </div>
      <div className="progress-item">
        {frame === "Completed" ? <FaCheckCircle className="check-icon" /> : <div></div>}
        <h3>Review</h3>
        <MdArrowForwardIos className="progress-arrow" />
      </div>
      <div className="progress-item">
        <h3>Complete</h3>
      </div>
    </div>
  );
};

export default Progress;

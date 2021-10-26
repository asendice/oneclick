import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import "../css/Progress.css";

import { MdArrowForwardIos } from "react-icons/md";

const Progress = ({ frame }) => {
  return (
    <div className="progress">
      <div className={`progress-item ${frame === "Match" && "completed"}`}>
        {frame === "Match" && <FaCheckCircle className="check-icon" />}
        <h3>Upload</h3>
        <MdArrowForwardIos className="progress-arrow" />
      </div>
      <div className="progress-item">
        <h3>Match</h3>
        <MdArrowForwardIos className="progress-arrow" />
      </div>
      <div className="progress-item">
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

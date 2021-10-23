import React from "react";
import "../css/Progress.css";

import { MdArrowForwardIos } from "react-icons/md";

const Progress = () => {
  return (
    <div className="progress">
      <div className="progress-item">
        <p>Upload</p>
        <MdArrowForwardIos className="progress-arrow" />
      </div>
      <div className="progress-item">
        <p>Match</p>
        <MdArrowForwardIos className="progress-arrow" />
      </div>
      <div className="progress-item">
        <p>Review</p>
        <MdArrowForwardIos className="progress-arrow"/>
      </div>
      <div className="progress-item">
        <p>Complete</p>
      </div>
    </div>
  );
};

export default Progress;

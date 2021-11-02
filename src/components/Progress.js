import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import "../css/Progress.css";

const Progress = ({ frame }) => {
  const progressHeaders = ["Upload", "Match", "Review", "Complete"];

  console.log();

  return (
    <div className="progress">
      {progressHeaders.map((header, index) => {
        return (
          <div key={index} className="progress-item">
            <FaCheckCircle
              className="check-icon"
              style={{
                color:
                  index < progressHeaders.indexOf(frame) ? "#4BB543" : "#fff",
              }}
            />
            <h3
              style={{
                color:
                  index < progressHeaders.indexOf(frame)
                    ? "#4BB543"
                    : header === frame
                    ? "#333"
                    : "#d3d3d3",
              }}
            >
              {header}
            </h3>
          </div>
        );
      })}
    </div>
  );
};

export default Progress;

import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdArrowForwardIos } from "react-icons/md";

const Progress = ({ frame }) => {
  const progressHeaders = ["Upload", "Match", "Review", "Complete"];


  return (
    <div className="progress">
      {progressHeaders.map((header, index) => {
        return (
          <div key={index} className="progress-item">
            {index < progressHeaders.indexOf(frame) ? (
              <FaCheckCircle className="check-icon" />
            ) : (
              <MdArrowForwardIos
                className="progress-arrow"
                style={{ color: frame === header ? "#333" : "grey" }}
              />
            )}

            <h3
              style={{
                color:
                  index < progressHeaders.indexOf(frame)
                    ? "rgb(19, 125, 88)"
                    : header === frame
                    ? "#333"
                    : "grey",
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

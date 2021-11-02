import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import "../css/Review.css";
const Review = ({ file, data }) => {
  const [reviewData, setReviewData] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      let keys = Object.keys(data[0]);
      let newArr = keys.map((header, index) => {
        let values = data.map((item, index) => {
          return item[header];
        });
        let obj = {
          name: header,
          values: values,
        };
        return obj;
      });
      setReviewData(newArr);
    }
  }, []);

  console.log(reviewData, "reviewData");

  if (data.length > 0) {
    return (
      <div className="review">
        <div className="review-header">
          <h3>{file.name} Review</h3>
        </div>
        <div className="review-table">
          {reviewData.map((item, index) => {
            return (
              <div key={index} className="review-table-col">
                <div className="review-table-headers">
                  <div className="review-table-header"><p>{item.name}</p></div>
                </div>
                {item.values.map((value, index) => {
                  return (
                    <div key="index" className="review-table-cell">
                      <p>{value}</p>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default Review;

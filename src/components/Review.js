import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { FixedSizeList as List } from 'react-window';
import "../css/Review.css";
const Review = ({ file, data, setFrame }) => {
  const [reviewData, setReviewData] = useState([]);
  // const [headers, setHeaders] = useState([]);
  // const [rows, setRows] = useState([]);



  // useEffect(() => {
  //   const headers = Object.keys(data[0]);
  //   const rows = data.map((row) => {
  //     const values = headers.map((header) => {
  //       return row[header];
  //     });
  //     return values;
  //   });
  //   console.log(rows, "rose")
  //   setHeaders(headers);
  //   setRows(rows);
  // }, [data]);

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


  if (data.length > 0) {
    return (
      <div className="review">
        <div className="review-header">
          <h3>{file.name} Review</h3>
          <Link
            style={{ textDecoration: "none" }}
            onClick={() => setFrame("Complete")}
            to="/complete"
          >
            <div className="trove-button">Complete</div>
          </Link>
        </div>
        <div className="review-table">
          {/* <List height={rows.length === 0 ? 20: rows.length}>
            {rows.map((row, index) => {
              return <div> </div>
            })}
          </List> */}
          {reviewData.map((item, index) => {
            return (
              <div key={index} className="review-table-col">
                <div className="review-table-headers">
                  <div className="review-table-header">
                    <p>{item.name}</p>
                  </div>
                </div>
                {item.values.map((value, index) => {
                  return (
                    <div key={index} className="review-table-cell">
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

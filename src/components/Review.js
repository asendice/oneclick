import React, { useState, useEffect } from "react";
import "../css/Review.css";
import { Redirect, Link } from "react-router-dom";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
const Review = ({ file, data, setFrame }) => {
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);


  useEffect(() => {
    if (data.length > 0) {
      // incase I want to add index to the review table we can add like this: 
      // const newData = data.map((item, index) => {
      //   return {'index': index, ...item}
      // })
      const headers = Object.keys(data[0]);
      const rows = data.map((row) => {
        const values = headers.map((header) => {
          return row[header];
        });
        return values;
      });
      setHeaders(headers);
      setRows(rows);
    }
  }, [data]);

  const Row = ({ index, style }) => (
    <div key={index} style={style} className="review-table-row">
      {rows[index].map((item, index) => {
        return (
          <div key={index} className="review-table-cell">
            <p>{item.length > 15 ? item.slice(0, 14) + "..." : item}</p>
          </div>
        );
      })}
    </div>
  );


  if (data.length > 0) {
    return (
      <div className="review">
        <div className="review-header">
          <h3>{file.name}</h3>
          <Link
            className="trove-button"
            style={{ textDecoration: "none" }}
            onClick={() => setFrame("Complete")}
            to="/complete"
          >
            Complete
          </Link>
        </div>
        <div className="review-table">
          <div className="review-table-headers">
            {headers.map((header, index) => {
              return (
                <div key={index} className="review-table-header">
                  <p>{header}</p>{" "}
                </div>
              );
            })}
          </div>
          {rows.length > 0 && (
            <AutoSizer>
              {({ height, width }) => (
                <>
                  <List
                    height={height - 40}
                    width={width}
                    itemData={rows}
                    itemCount={rows.length}
                    itemSize={41}
                    className="no-scrollbars"
                  >
                    {Row}
                  </List>
                </>
              )}
            </AutoSizer>
          )}
         
        </div>
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default Review;

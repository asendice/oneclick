import React, { useEffect, useState } from "react";
import "../css/FixModal.css";
const FixModal = ({ header, errorData, open, setOpen }) => {
  const [errors, setErrors] = useState([]);
  const { name } = header;

  console.log(errors, "errors");

  useEffect(() => {
    if (errorData.length > 0) {
      let headers = Object.keys(errorData[0]);
      let newArr = headers.map((header, index) => {
        let values = errorData.map((item, index) => {
          return item[`${header}`];
        });
        let obj = {
          name: header,
          values: values,
        };
        return obj;
      });
      setErrors(newArr);
    }
  }, [errorData]);

  const dismissModal = (e) => {
    if (e.target.id === "fix-modal") {
      setOpen(false);
    }
  };

  if (open) {
    return (
      <div
        id="fix-modal"
        className="fix-modal"
        onClick={(e) => dismissModal(e)}
      >
        <div className="fix-modal-content">
          <p className="modal-index">
            {errors[0].values.length} {name} Errors
          </p>
          <div className="modal-table">
            {errors.map((error, index) => {
              return (
                <div key={index} className="modal-table-column">
                  <div className="modal-table-header">
                    <h4>{error.name}</h4>
                  </div>
                  {error.values.map((value, index) => {
                    return header.name === error.name ? (
                      <input placeholder="fix me" className="modal-table-input"/>
                    ) : (
                      <div key={index} className="modal-table-cell">
                        <p>{value}</p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
          <div className="fix-modal-button-container">
            <div
              className="fix-modal-button cancel"
              onClick={() => setOpen(false)}
            >
              Cancel
            </div>
            <div className="fix-modal-button confirm">Confirm Changes</div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default FixModal;

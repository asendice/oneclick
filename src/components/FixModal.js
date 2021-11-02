import React, { useEffect, useState } from "react";
import "../css/FixModal.css";
const FixModal = ({ header, updateData, errorData, setOpen }) => {
  const [errors, setErrors] = useState([]);
  const [inputValues, setInputValues] = useState(
    errorData.map((obj) => {
      return {
        [header.name]: obj[header.name],
        index: obj.index,
      };
    })
  );

  const updateValue = (value, index) => {
    let iV = inputValues;
    iV[index][header.name] = value;
    setInputValues(iV);
  };

  const onConfirmClick = () => {
    updateData(inputValues);
    setOpen(false);
  };

  useEffect(() => {
    if (errorData.length > 0) {
      let headers = Object.keys(errorData[0]);
      let newArr = headers.map((header, index) => {
        let values = errorData.map((item, index) => {
          return item[header];
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

  return (
    <div id="fix-modal" className="fix-modal" onClick={(e) => dismissModal(e)}>
      <div className="fix-modal-content">
        {errors[0] && (
          <p className="modal-index">
            {errors[0].values.length} {header.name} Errors
          </p>
        )}
        <div className="modal-table">
          {errors
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((error, index) => {
              return (
                <div key={index} className="modal-table-column">
                  <div className="modal-table-header">
                    <h4>{error.name}</h4>
                  </div>
                  {error.values.map((value, index) => {
                    return header.name === error.name ? (
                      <input
                        key={index}
                        type="text"
                        name={index}
                        placeholder="fix me"
                        className="modal-table-input"
                        onChange={(e) => updateValue(e.target.value, index)}
                      />
                    ) : (
                      <div key={index} className="modal-table-cell">
                        <p>{value}</p>
                      </div>
                    );
                  })}{" "}
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
          <div
            className="fix-modal-button confirm"
            onClick={() => onConfirmClick()}
          >
            Confirm Changes
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixModal;

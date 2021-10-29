import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Match.css";
import CsvHeader from "./CsvHeader";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Redirect } from "react-router";

const Match = ({ file, data }) => {
  const [headers, setHeaders] = useState([]);
  const [endZoneList, setEndZoneList] = useState([]);
  const [backEndHeaders, setBackEndHeaders] = useState([]);

  const match = (array) => {
    const endHeaders = backEndHeaders.map((header) => {
      return header.name;
    });

    const matched = array.map((item) => {
      const values = item.values.slice(0, item.values.length - 1);
      const valueErrors = values.filter((value, index) => value.length < 3);

      let obj = {
        name: item.name,
        values: item.values,
        headerMatch: endHeaders.includes(
          item.name.slice(1, item.name.length - 1)
        ),
        headerValues: {
          match: valueErrors.length === 0,
          errors: valueErrors,
        },
      };
      return obj;
    });
    setHeaders(matched);
  };

  const getBackEndHeaders = async () => {
    await axios
      .get("http://localhost:3000/headers")
      .then((response) => {
        if (!response) {
          console.log("error no response");
        } else {
          return response;
        }
      })
      .then((response) => setBackEndHeaders(response.data));
  };

  useEffect(() => {
    getBackEndHeaders();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      let arr = Object.keys(data[0]);
      let newArr = arr.map((header, index) => {
        let values = data.map((item, index) => {
          return item[`${header}`];
        });
        let obj = {
          name: header,
          values: values,
        };
        return obj;
      });
      match(newArr);
    }
  }, [data, backEndHeaders]);

  const handleDragEnd = ({ destination, source }) => {
    const items = headers;
    const arr = endZoneList;
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      if (destination.droppableId === "headers") {
        const [reorderedItem] = items.splice(source.index, 1);
        items.splice(destination.index, 0, reorderedItem);
        setHeaders(items);
      }
      if (destination.droppableId === "test") {
        const [reorderedItem] = arr.splice(source.index, 1);
        arr.splice(destination.index, 0, reorderedItem);
        setEndZoneList(arr);
      }
    }
    if (
      source.droppableId === "headers" &&
      destination.droppableId === "test"
    ) {
      const [reorderedItem] = items.splice(source.index, 1);
      arr.splice(destination.index, 0, reorderedItem);
      setEndZoneList(arr);
      // match(reorderedItem, destination.index);
    }
    if (
      destination.droppableId === "headers" &&
      source.droppableId === "test"
    ) {
      const [reorderedItem] = arr.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);
      setHeaders(items);
    }
  };

  if (file) {
    return (
      <div className="match">
        <div className="match-header">{file.name}</div>
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="main">
            <Droppable droppableId="headers">
              {(provided) => {
                return (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="drop-zone"
                  >
                    {headers.map((header, index) => {
                      return (
                        <Draggable
                          key={header.name}
                          draggableId={header.name.toString()}
                          index={index}
                        >
                          {(provided) => {
                            return (
                              <div
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
                                <CsvHeader
                                  header={header}
                                  endHeaders={backEndHeaders}
                                />
                              </div>
                            );
                          }}
                        </Draggable>
                      );
                    })}

                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
            {/* <Droppable droppableId="test">
              {(provided) => {
                return (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="end-drop-zone"
                  >
                    {endZoneList.length > 0
                      ? endZoneList.map((item, index) => {
                          return (
                            <Draggable
                              key={item.name}
                              draggableId={item.name.toString()}
                              index={index}
                            >
                              {(provided) => {
                                return (
                                  <div
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                  >
                                    <CsvHeader header={item} />
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })
                      : ""}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable> */}
          </div>
        </DragDropContext>
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default Match;

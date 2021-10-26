import React, { useEffect, useState } from "react";
import "../css/FileDisplay.css";
import CsvHeader from "./CsvHeader";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const FileDisplay = ({ file, data }) => {
  const [headers, setHeaders] = useState([]);
  const [newData, setNewData] = useState([]);
  const [newList, setNewList] = useState([]);
  const [selectedHeader, setSelectedHeader] = useState({});

  useEffect(() => {
    if (data.length > 0) {
      setHeaders(Object.keys(data[0]));
      let newData = [data[1], data[2], data[3]];
      setNewData(newData);
    }
  }, [data]);

  const handleDragEnd = ({ destination, source }) => {
    const items = headers;
    const arr = newList;
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
        setNewList(arr);
      }
    }

    if (
      source.droppableId === "headers" &&
      destination.droppableId === "test"
    ) {
      const [reorderedItem] = items.splice(source.index, 1);
      arr.splice(destination.index, 0, reorderedItem);
      setNewList(arr);
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

  return (
    <div className="file-display">
      <div className="file-header">{file.name}</div>
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
                        key={header}
                        draggableId={header.toString()}
                        index={index}
                      >
                        {(provided) => {
                          return (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              onClick={() =>
                                setSelectedHeader({
                                  name: header,
                                  newData: newData,
                                })
                              }
                            >
                              <CsvHeader header={header} newData={newData} />
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
          <Droppable droppableId="test">
            {(provided) => {
              return (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="end-drop-zone"
                >
                  {newList.length > 0
                    ? newList.map((item, index) => {
                        return (
                          <Draggable
                            key={item}
                            draggableId={item.toString()}
                            index={index}
                          >
                            {(provided) => {
                              return (
                                <div
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                >
                                  <CsvHeader header={item} newData={newData} />
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
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default FileDisplay;

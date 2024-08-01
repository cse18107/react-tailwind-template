import React, { useState } from "react";
import "./App.css";

function App() {
  const [draggingTask, setDraggingTask] = useState();
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("")
  const handleDrag = (task) => {
    setDraggingTask(task);
  }
  const handleKeyDown = (e) => {
    const keyCode = e.keyCode;
    if(keyCode===13){
      const newTask = {
        status: 'TODO',
        task: e.target.value,
        id: Date.now()
      }
      const copyTasks = [...tasks, newTask];
      setTasks(copyTasks);
      setInputValue("");
    }
  }
  const handleUpdateTaskStatus =(rtask,status) => {
    const filteredTask = tasks.filter((task) => task.id !== rtask.id);
    rtask.status = status
    const newTask = [...filteredTask,rtask ];
    // console.log(newTask)
    setTasks(newTask);
  }
  const handleDrop = (e) => {
    const status = e.target.getAttribute("data-status");
    console.log(status);
    if(status==="TODO" || status==="INPROGRESS" || status ==="DONE")
    handleUpdateTaskStatus(draggingTask, status);
  };
  const handleOnDragOver = (e) => {
    e.preventDefault();
  };
  return (
    <div className="App column">
      <div>Task Manager</div>
      <input
        className="input-task"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="center-align-start gap-2 min-h-[90vh]">
        <div
          className="column min-h-[90vh]"
          data-status="TODO"
          onDrop={handleDrop}
          onDragOver={handleOnDragOver}
        >
          <h1 className="h-style todo-bg">TODO</h1>
          {tasks &&
            tasks.map((task, ind) => {
              return task.status === "TODO" ? (
                <div
                  draggable
                  onDrag={() => handleDrag(task)}
                  className="h-style task-box-style center-justify-between"
                >
                  {task.task}
                </div>
              ) : (
                <></>
              );
            })}
        </div>
        <div
          className="column min-h-[90vh]"
          data-status="INPROGRESS"
          onDrop={handleDrop}
          onDragOver={handleOnDragOver}
        >
          <div className="h-style inprogress-bg">IN PROGRESS</div>
          {tasks &&
            tasks.map((task, ind) => {
              return task.status === "INPROGRESS" ? (
                <div
                  draggable
                  onDrag={() => handleDrag(task)}
                  className="h-style task-box-style center-justify-between"
                >
                  {task.task}
                </div>
              ) : (
                <></>
              );
            })}
        </div>
        <div
          className="column min-h-[90vh]"
          data-status="DONE"
          onDrop={handleDrop}
          onDragOver={handleOnDragOver}
        >
          <div className="h-style done-bg">DONE</div>
          {tasks &&
            tasks.map((task, ind) => {
              return task.status === "DONE" ? (
                <div
                  draggable
                  onDrag={() => handleDrag(task)}
                  className="h-style task-box-style center-justify-between"
                >
                  {task.task}
                </div>
              ) : (
                <></>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;

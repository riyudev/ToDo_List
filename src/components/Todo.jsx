import React, { useState, useRef, useEffect } from "react";
import { FaRegCalendarPlus, FaTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { IoTrashBin } from "react-icons/io5";

function Todo() {
  const saveTodos = () => {
    const data = localStorage.getItem("todoList");
    return data ? JSON.parse(data) : [];
  };

  const [todoList, setTodoList] = useState(saveTodos);
  const [newTask, setNewTask] = useState("");
  const bottomRef = useRef(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  const addTask = () => {
    if (newTask.trim() === "") {
      setError(true);
      return;
    }
    const task = {
      id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
      taskName: newTask,
    };
    setTodoList([...todoList, task]);
    setNewTask("");
    setError(false);
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  const deleteTask = (id) => {
    setTodoList(todoList.filter((task) => task.id !== id));
  };

  const deleteAllTask = () => {
    setTodoList([]);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className="flex flex-col bg-gradient-to-bl from-slate-700 to-slate-500 py-8 rounded-xl space-y-8 w-[93%] max-w-7xl md:w-[460px] min-h-[90vh] px-1">
      <header className="flex items-start justify-center space-x-2">
        <FaRegCalendarPlus className="text-3xl min-w-10 text-white" />
        <h1 className="font-poppinsBold text-3xl text-white">To-Do List</h1>
      </header>

      <div className="flex flex-col flex-grow space-y-8">
        <div className="flex flex-col justify-center items-center px-3 gap-y-3">
          <div className="flex items-center justify-center bg-white rounded-full w-[90%]">
            <input
              value={newTask}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              type="text"
              placeholder="Add task..."
              className="font-poppinsRegular text-sm sm:text-base bg-transparent px-5 min-w-10 w-full max-w-5xl border-none rounded-full focus:outline-none"
            />
            <button
              onClick={addTask}
              className="py-2 sm:py-3 px-6 rounded-full bg-gradient-to-bl from-orange-400 to-orange-600 active:to-orange-300"
            >
              <FaPlus className="text-xl text-slate-700" />
            </button>
          </div>

          <p
            className={`font-poppinsRegular text-red-500 ${
              error ? "opacity-100" : "opacity-0"
            }`}
          >
            Please add task!
          </p>
        </div>

        <div className="flex flex-col flex-grow gap-y-1 max-h-[300px] sm:max-h-[380px] overflow-y-scroll scrollbar-thin scrollbar-thumb-stone-500 scrollbar-track-transparent pl-3">
          {todoList.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between border-b-2 border-orange-500 hover:bg-slate-100/20 rounded-sm px-4 py-2 mr-3"
            >
              <p className="font-poppinsRegular text-sm sm:text-base text-nowrap text-white truncate">
                {task.taskName}
              </p>
              <div className="flex justify-center items-center space-x-5 ml-5">
                <BsBoxArrowUpRight className="text-xl text-blue-500 cursor-pointer" />
                <FaTrashAlt
                  onClick={() => deleteTask(task.id)}
                  className="text-xl text-red-500 cursor-pointer"
                />
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      {todoList.length > 0 && (
        <div
          onClick={deleteAllTask}
          className="flex justify-center py-1 bg-gradient-to-b from-red-400 to-red-600 md:hover:to-red-500 mx-3 rounded-sm cursor-pointer"
        >
          <IoTrashBin className="text-2xl text-white" />
        </div>
      )}
    </div>
  );
}

export default Todo;

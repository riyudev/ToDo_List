import React, { useState, useRef, useEffect } from "react";
import { FaRegCalendarPlus, FaTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import DeleteAll from "./DeleteAll";

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
      completed: false,
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

  const toggleCompleted = (id) => {
    setTodoList(
      todoList.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className="flex flex-col bg-gradient-to-bl from-slate-700 to-slate-500 py-8 rounded-xl gap-y-8 w-[93%] max-w-7xl md:w-[460px] min-h-[82vh] px-1">
      <header className="flex items-start justify-center space-x-2">
        <FaRegCalendarPlus className="text-3xl min-w-10 text-white" />
        <h1 className="font-poppinsBold text-3xl text-white">To-Do List</h1>
      </header>

      <div className="flex flex-col flex-grow gap-y-6">
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

        <div className="flex flex-col flex-grow gap-y-1 max-h-[calc(90vh*0.4)] overflow-y-scroll scrollbar-thin scrollbar-thumb-stone-500 scrollbar-track-transparent pl-3">
          {todoList.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between border-b-2 border-orange-500 hover:bg-slate-100/20 rounded-sm px-2 md:px-3 py-1 mr-3"
            >
              <p
                className={`font-poppinsRegular text-sm sm:text-base text-nowrap truncate ${
                  task.completed ? "line-through text-gray-400" : "text-white"
                }`}
              >
                {task.taskName}
              </p>
              <div className="flex justify-center items-center space-x-4 ml-5">
                {task.completed ? (
                  <MdCheckBox
                    onClick={() => toggleCompleted(task.id)}
                    className="text-2xl text-green-500 cursor-pointer"
                  />
                ) : (
                  <MdOutlineCheckBoxOutlineBlank
                    onClick={() => toggleCompleted(task.id)}
                    className="text-2xl text-blue-500 cursor-pointer"
                  />
                )}
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

      {todoList.length > 0 && <DeleteAll onDeleteAll={deleteAllTask} />}
    </div>
  );
}

export default Todo;

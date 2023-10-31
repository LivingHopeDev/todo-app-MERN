import { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bgMobile from "./assets/bg-mobile-light.jpg";
import bgMobileD from "./assets/bg-mobile-dark.jpg";
import bgDesktop from "./assets/bg-desktop-light.jpg";
import bgDesktopD from "./assets/bg-desktop-dark.jpg";
import cross from "./assets/icon-cross.svg";
import moon from "./assets/icon-moon.svg";
import sun from "./assets/icon-sun.svg";
import check from "./assets/icon-check.svg";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    } else {
      fetchTodo();
    }
  }, []);
  const baseUrl = "https://todoapi-t73j.onrender.com";
  const fetchTodo = async () => {
    const res = await fetch(`${baseUrl}`);
    const data = await res.json();
    setTodos(data.message);
  };
  const fetchCompletedTodo = async () => {
    const res = await fetch(`${baseUrl}/todos/completed`);
    const data = await res.json();
    setTodos(data.message);
  };
  const fetchNotCompletedTodo = async () => {
    const res = await fetch(`${baseUrl}/todos/not-completed`);
    const data = await res.json();
    setTodos(data.message);
  };
  const handleIncompleteTodos = () => {
    let incompleteTodosLength = 0;
    if (todos === "No todos yet: Add one now") {
      incompleteTodosLength;
    } else {
      const incompleteTodos = todos.filter((todo) => !todo.completed);
      incompleteTodosLength = incompleteTodos.length;
    }
    return incompleteTodosLength;
  };

  const handleTodoCheckbox = async (todoId) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
    try {
      // Send a PUT request to your backend to update the 'completed' status
      const res = await fetch(`${baseUrl}/todo/${todoId}/set-completed`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        toast.success(data.message);
      } else {
        const errorData = await res.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      toast.error("Network error occurred while updating the todo.");
    }
  };

  const handleDelete = async (todoId) => {
    if (confirm("Are you sure to delete?")) {
      try {
        const res = await fetch(`${baseUrl}/todo/${todoId}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        });
        if (res.ok) {
          const data = await res.json();

          toast.success(data.message);
          fetchTodo();
        } else {
          const errorData = await res.json();
          toast.error(errorData.message);
        }
      } catch (error) {
        toast.error("Network error occurred while deleting the todo.");
      }
    }
  };
  const deleteAllCompleted = async () => {
    if (confirm("Are you sure to delete?")) {
      try {
        const res = await fetch(`${baseUrl}/todos/completed`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        });
        if (res.ok) {
          const data = await res.json();

          toast.success(data.message);
          fetchTodo();
        } else {
          const errorData = await res.json();
          toast.error(errorData.message);
        }
      } catch (error) {
        toast.error("Network error occurred while deleting the todo.");
      }
    }
  };
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  //const handle drag sorting
  const handleSort = () => {
    //duplicate items
    let todoItems = [...todos];

    //remove and save the dragged item content
    const draggedItemContent = todoItems.splice(dragItem.current, 1)[0];

    //switch the position
    todoItems.splice(dragOverItem.current, 0, draggedItemContent);

    //reset the position ref
    dragItem.current = null;
    dragOverItem.current = null;

    //update the actual array
    setTodos(todoItems);
    localStorage.setItem("todos", JSON.stringify(todoItems));
  };

  const initialMode = localStorage.getItem("darkMode") === "true";
  const [darkMode, setDarkMode] = useState(initialMode);

  const toggleMode = () => {
    const newMode = !darkMode;
    localStorage.setItem("darkMode", newMode);
    setDarkMode(newMode);
  };

  const [item, setItem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      item: item,
    };
    if (item.trim() === "") {
      toast.error("Please enter a todo item.");
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/todo`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const data = await res.json();
        if (data) {
          toast.success(data.message);
          fetchTodo();
        }
      } else {
        const errorData = await res.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      // console.error("Network error:", error);
      toast.error("Network error occurred while creating a new todo.");
    }
  };

  return (
    <>
      <div className="relative">
        {!darkMode ? (
          <>
            <img
              src={bgMobile}
              alt=""
              className="w-screen h-[15rem] md:hidden"
            />
            <img
              src={bgDesktop}
              alt=""
              className="w-screen h-[15rem] hidden md:block"
            />
          </>
        ) : (
          <>
            <img
              src={bgMobileD}
              alt=""
              className="w-screen h-[15rem] md:hidden"
            />
            <img
              src={bgDesktopD}
              alt=""
              className="w-screen h-[15rem] hidden md:block"
            />
          </>
        )}

        <article
          className={`absolute top-4 p-4 inset-x-0 font-josefin md:w-1/2 md:mx-auto ${
            darkMode ? "text-white" : "text-veryDarkBlue"
          }`}
        >
          <div className="flex justify-between items-center  p-4 ">
            <h1 className="uppercase text-white font-semibold tracking-widest text-2xl">
              todo
            </h1>
            <button
              className=" p-2 rounded-full hover:bg-veryDarkDesaturatedBlue"
              onClick={toggleMode}
            >
              {darkMode ? (
                <img
                  src={sun}
                  alt="moon-icon"
                  className="w-[1.5rem] h-[1.5rem]"
                />
              ) : (
                <img
                  src={moon}
                  alt="moon-icon"
                  className="w-[1.5rem] h-[1.5rem]"
                />
              )}
            </button>
          </div>
          <div className="p-4  ">
            <form
              className={`flex justify-center items-center ${
                darkMode ? "bg-veryDarkDesaturatedBlue" : " bg-white"
              }  mb-[1.5rem] rounded-[0.5rem]`}
            >
              <button type="submit" onClick={handleSubmit}>
                <img
                  src={""}
                  alt=""
                  className={`
                " border-2
              bg-cover rounded-full p-1 w-[1.2rem] h-[1.2rem] `}
                />
              </button>
              <input
                type="text"
                name="item"
                value={item}
                onChange={(e) => {
                  setItem(e.target.value);
                }}
                className={` w-[90%] p-4 ${
                  darkMode ? "bg-veryDarkDesaturatedBlue" : " bg-white"
                } outline-none `}
                placeholder="Create a new todo.."
              />
            </form>

            {!Array.isArray(todos) ? (
              <div
                className={`flex flex-row justify-between items-center  mb-[0.2rem] w-full p-4 rounded-[0.5rem] font-semibol  ${
                  darkMode ? "bg-veryDarkDesaturatedBlue" : "bg-white"
                }`}
              >
                <p>{todos}</p>
              </div>
            ) : (
              todos.map((todo, index) => (
                <div
                  key={todo._id}
                  className={`flex flex-row justify-between items-center  mb-[0.2rem] w-full p-4 rounded-[0.5rem] font-semibol  ${
                    darkMode ? "bg-veryDarkDesaturatedBlue" : "bg-white"
                  }  cursor-move`}
                  draggable
                  onDragStart={() => (dragItem.current = index)}
                  onDragEnter={() => (dragOverItem.current = index)}
                  onDragEnd={handleSort}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <div className={`flex justify-center items-center `}>
                    <img
                      src={check}
                      alt="check-icon"
                      className={` ${
                        todo.completed
                          ? " bg-[url('./assets/bg-mobile-light.jpg')]"
                          : "border-2"
                      } bg-cover rounded-full p-1 w-[1.2rem] h-[1.2rem] cursor-pointer `}
                      onClick={() => handleTodoCheckbox(todo._id)}
                    />
                    <p
                      className={`mx-4 ${
                        todo.completed ? "line-through" : ""
                      }  `}
                    >
                      {todo.todo}
                    </p>
                  </div>
                  <button onClick={() => handleDelete(todo._id)}>
                    <img
                      src={cross}
                      alt="cross-icon"
                      className="w-[1rem] h-[1rem] [1rem] mr-[1rem]"
                    />
                  </button>
                </div>
              ))
            )}

            <div
              className={`flex flex-row justify-between items-center ${
                darkMode ? "bg-veryDarkDesaturatedBlue" : "bg-white"
              }   mb-[0.2rem] w-full p-4 rounded-[0.5rem] font-semibold text-lightGreyishBlue`}
            >
              <p className="">{handleIncompleteTodos()} items left</p>
              <button
                type="submit"
                className="ml-4 hover:text-lightGreyishBlueHover"
                onClick={deleteAllCompleted}
              >
                Clear Completed
              </button>
            </div>

            <div
              className={`flex flex-row justify-center gap-4 items-center ${
                darkMode ? "bg-veryDarkDesaturatedBlue" : "bg-white"
              }  mt-4 w-full p-4 rounded-[0.5rem] font-semibold text-darkGreyishBlue `}
            >
              <p
                className="hover:text-lightGreyishBlueHover  cursor-pointer "
                onClick={fetchTodo}
              >
                All
              </p>
              <p
                className="hover:text-lightGreyishBlueHover cursor-pointer "
                onClick={fetchNotCompletedTodo}
              >
                Active
              </p>
              <p
                className="hover:text-lightGreyishBlueHover  cursor-pointer "
                onClick={fetchCompletedTodo}
              >
                Completed
              </p>
            </div>
          </div>
        </article>
      </div>
      {!darkMode ? (
        <div className="bg-lightGreyishBlueHover h-screen"></div>
      ) : (
        <div className="bg-veryDarkBlue h-screen"></div>
      )}
      <ToastContainer />
    </>
  );
}

export default App;

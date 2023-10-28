// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const fetchTodo = async () => {
//   const res = await fetch(`http://localhost:5000`);
//   const data = await res.json();
//   const result = data.message;
//   return result;
// };

// const todoCheckBox = async (todoId) => {};

// // const handleDelete = async ({ todoId, setTodos }) => {
// //   if (confirm("Are you sure to delete?")) {
// //     try {
// //       const res = await fetch(`http://localhost:5000/todo/${todoId}`, {
// //         method: "DELETE",
// //         headers: {
// //           "content-type": "application/json",
// //         },
// //       });
// //       if (res.ok) {
// //         const data = await res.json();

// //         toast.success(data.message);
// //         fetchTodo(setTodos);
// //       } else {
// //         const errorData = await res.json();
// //         toast.error(errorData.message);
// //       }
// //     } catch (error) {
// //       // console.error("Network error:", error);
// //       toast.error("Network error occurred while deleting the todo.");
// //     }
// //   }
// // };

// export { deleteAllCompleted, todoCheckBox, fetchTodo };

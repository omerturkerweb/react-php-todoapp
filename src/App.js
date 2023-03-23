import { BsFillTrashFill } from "react-icons/bs";
import { IoCheckmarkDone } from "react-icons/io5";
import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const getData = () => {
    try {
      fetch("http://localhost/reactphp/index.php")
        .then((response) => response.json())
        .then((response) => setTodos(response))
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const addtodoHandle = () => {
    if (todo !== "") {
      try {
        const formData = new FormData();
        formData.append("action", "add-todo");
        formData.append("todo", todo);
        fetch("http://localhost/reactphp/index.php", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((response) => setTodos(response))
          .catch((err) => console.log(err));
      } catch (e) {
        console.log("failed".e);
      }
    } else {
      alert("todo cant be empty!");
    }

    setTodo("");
  };
  const deleteHandle = (id) => {
    try {
      const formData = new FormData();
      formData.append("action", "delete-todo");
      formData.append("todo_id", id);
      fetch("http://localhost/reactphp/index.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((response) => setTodos(response))
        .catch((err) => console.log(err));
    } catch (e) {
      console.log("failed".e);
    }
  };
  const dontetodoHandle = (id, done) => {
    try {
      const formData = new FormData();
      formData.append("action", "done-todo");
      formData.append("done_id", id);
      formData.append("done", done == 0 ? 1 : 0);
      fetch("http://localhost/reactphp/index.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((response) => setTodos(response))
        .catch((err) => console.log(err));
    } catch (e) {
      console.log("failed".e);
    }
  };
  return (
    <div>
      <h3>TODOAPP</h3>
      <input
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className="border border-black"
        type="text"
      ></input>
      <button onClick={addtodoHandle} className="border border-black">
        add to do
      </button>
      {todos !== [] ? (
        todos.map((todo, index) => {
          return (
            <div
              className={`todo-${todo.todo_id} flex flex-row items-center gap-x-4`}
              key={index}
            >
              <h3
                className={
                  todo.todo_done == 1 ? "text-2xl line-through" : "text-2xl"
                }
              >
                {todo.todo}
              </h3>
              <button
                onClick={() => dontetodoHandle(todo.todo_id, todo.todo_done)}
              >
                <IoCheckmarkDone />
              </button>
              <button onClick={() => deleteHandle(todo.todo_id)}>
                <BsFillTrashFill />
              </button>
              <span className="font-extralight">{todo.todo_time}</span>
            </div>
          );
        })
      ) : (
        <h3>WAITING DATA'</h3>
      )}
    </div>
  );
}

export default App;

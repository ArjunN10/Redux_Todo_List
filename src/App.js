import { useSelector, useDispatch } from "react-redux";
import { addtodo, deletetodo, edittodo, savetodo } from "./components/Todo";
import { useRef, useState } from "react";

function App() {
  const myRef = useRef();
  const todo = useSelector((state) => state.list.todos);
  const dispatch = useDispatch();
  const [editValue, setEditValue] = useState("");

  const add = (e) => {
    e.preventDefault();
    const value = e.target.todo.value;
    dispatch(addtodo(value));
    e.target.reset();
  };

  const save = (id) => {
    const saveValue = myRef.current.value;
    dispatch(savetodo({ id: id, value: saveValue }));
  };

  const handleEditClick = (id, value) => {
    // When the "Edit" button is clicked, set the edited value in the state
    setEditValue(value);
    dispatch(edittodo(id)); // Dispatch the edit action
  };

  return (
    <div className="App">
      <h1>TODO APP</h1>
      <form onSubmit={add}>
        <input placeholder="Add here.." id="todo" type="text" />
        <button type="submit">ADD</button>
      </form>

      <ul>
        {todo.map((todos) => (
          <li key={todos.id}>
            {todos.editkey ? (
              <>
                <span>{todos.value}</span>
                <button className="delete" onClick={() => dispatch(deletetodo(todos.id))}>
                  Delete
                </button>
              </>
            ) : (
              <>
                <input type="text" ref={myRef} value={editValue} onChange={(e) => setEditValue(e.target.value)} />
                <button type="button" onClick={() => save(todos.id)}>Save</button>
              </>
            )}
            <button className="edit" onClick={() => handleEditClick(todos.id, todos.value)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

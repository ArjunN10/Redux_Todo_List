import { useSelector, useDispatch } from "react-redux";
import { addtodo ,deletetodo,edittodo,savetodo } from "./components/Todo";

// import "./App.css";
import { useRef } from "react";

function App() {
  const myRef=useRef()
  const todo = useSelector((state) => state.list.todos);
  // console.log(todo);

  const dispatch = useDispatch();

  const add = (e) => {
    e.preventDefault();
    const value = e.target.todo.value;
    dispatch(addtodo(value));
    e.target.reset()
  };

const save = (id)=>{
  const savevalue = myRef.current.value
  dispatch(savetodo({id:id,value:savevalue}))
}


  return (
    <div className="App">
      <h1>TODO APP</h1>
      <form onSubmit={add}>
        <input placeholder="Add here.." id="todo" type="text"  />
        <button type="submit">ADD</button>
      </form>

      <ul>
        {todo.map((todos) => (
          <li>

          {(todos.editkey==true)?
          <>
            {todos.value}
            <button className="delete" onClick={()=>dispatch(deletetodo(todos.id))}>Delete</button>
            <button className="edit" onClick={()=>dispatch(edittodo(todos.id))}>edit</button>
            </>:
            <>
              <input type="text" ref={myRef} value={todos.value} /> <button type="button" onChange={()=>save(todos.id)}>save</button>
            </>
          }</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
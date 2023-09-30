import { useSelector, useDispatch } from "react-redux";
import { addtodo, deletetodo, edittodo, savetodo } from "./components/Todo";
import { useRef, useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
} from "mdb-react-ui-kit";

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
    <div>
      <MDBContainer className="py-5">
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol>
            <MDBCard
              style={{ borderRadius: ".75rem", backgroundColor: "#eff1f2" }}
              >
              <MDBCardBody className="py-4 px-4 px-md-5">
                <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
                  <MDBIcon fas icon="check-square" className="me-1" />
                  <u>Todo-App</u>
                </p>
                <div className="pb-2">
                  <form onSubmit={add}>
                    <MDBCard className=" mx-auto sm-12 lg-2 md-3" style={{maxWidth:'700px',maxHeight:'100vh'}}>
                      <MDBCardBody>
                        <div className="d-flex flex-row align-items-center">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Add new..."
                            id="todo"
                          />
                          <div className="mx-2">
                            <MDBBtn>Add</MDBBtn>
                          </div>
                        </div>
                      </MDBCardBody>
                    </MDBCard>
                  </form>
                  
                  <ul type="square" >
                    {todo.map((todos) => (
                      <li className="  my-3" key={todos.id}>
                        {todos.editkey === true ? (
                          <>
                            <span>{todos.value}</span>
                            <MDBBtn
                              className="delete mx-3 bg-danger"
                              onClick={() => dispatch(deletetodo(todos.id))}
                            >
                              Delete
                            </MDBBtn>
                          </>
                        ) : (
                          <>
                            <input
                              type="text"
                              className="form-control form-control-lg w-50"
                              ref={myRef}
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                            />
                            <MDBBtn
                              className="mx-2 bg-success"
                              type="button"
                              onClick={() => save(todos.id)}
                            >
                              Save
                            </MDBBtn>
                          </>
                        )}
                        <MDBBtn
                          className="edit mx-2 bg-dark"
                          onClick={() => handleEditClick(todos.id, todos.value)}
                        >
                          Edit
                        </MDBBtn>
                      </li>
                    ))}
                  </ul>
                  </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default App;

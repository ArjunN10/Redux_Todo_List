import { useSelector, useDispatch } from "react-redux";
import { addtodo, deletetodo, edittodo, savetodo } from "./components/Todo";
import {   useRef } from "react";
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
  const myRef = useRef(null);
  const todo = useSelector((state) => state.list.todos);
  const dispatch = useDispatch();

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



  return (
    <div>
      <MDBContainer className="py-5">
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol>
            <MDBCard
              style={{ borderRadius: ".75rem", backgroundColor: "#352F44" }}
              >
              <MDBCardBody className="py-4 px-4 px-md-5">
                <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
                  <MDBIcon fas icon="check-square" color='success' className="me-1" />
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
                            required
                          />
                          <div className="mx-2">
                            <MDBBtn>Add</MDBBtn>
                          </div>
                        </div>
                      </MDBCardBody>
                    </MDBCard>
                  </form>


                  <ol className="mt-5 text-white "  style={{fontSize:'20px'}}>
                    {todo.map((todos) => (
                      <li className="  my-3 " key={todos.id}>
                        {todos.editkey === true ? (
                          <>
                              <input
                              type="text"
                              className="form-control form-control-lg sm-12 lg-2 md-3" style={{maxWidth:'400px',maxHeight:'100vh'}}
                              ref={myRef}
                              value={todos.value}
                              required
                               />
                            <MDBBtn
                              className="delete mx-3 mt-3 bg-danger"
                              onClick={() => dispatch(deletetodo(todos.id))}

                            >
                              Delete
                            <MDBIcon
                            fas
                            icon="trash-alt"
                            color="white"
                            size="lg"
                            className="ms-1"
                          />
                            </MDBBtn>
                            <MDBBtn
                          className="edit mx-2 mt-3 bg-dark"
                          onClick={() =>dispatch(edittodo(todos.id))
                          
                          }
                        >
                          <MDBIcon
                        fas
                        icon="pencil-alt"
                        className="me-1"
                        color="info"
                        />
                        Edit
                        </MDBBtn>
                          </>
                        ) : (
                          <>
                            <input
                              type="text"
                              className="form-control form-control-lg sm-12 lg-2 md-3" style={{maxWidth:'400px',maxHeight:'100vh'}}
                              ref={myRef}
                              required
                            />
                            <MDBBtn
                              className="mx-2 mt-2 bg-success"
                              type="button"
                              onClick={() => save(todos.id)}
                            >
                              Save
                              <MDBIcon
                               fas icon="check"
                               className="ms-1"
                               alt='icon' />
                            </MDBBtn>
                          </>
                        )}
                       
                      </li>
                    ))}
                  </ol>
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

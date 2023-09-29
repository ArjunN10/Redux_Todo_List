import { createSlice  } from "@reduxjs/toolkit";

const INITIAL_STATE={
    todos:[],

}


const todoSlice = createSlice({
    name: "todo",
    initialState:INITIAL_STATE,
        reducers:{

            addtodo: (state,action)=>{
                state.todos.push({id:Date.now(),value:action.payload ,editkey:true})
                console.log(action)
            },
            
            edittodo: (state,action)=>{
             state.todos.find((item)=>{
                if(item.id == action.payload){
                 item.editkey=false
                }
            })
            },
            deletetodo: (state,action)=>{
                console.log(action);
               const filterprd= state.todos.filter((item)=> item.id != action.payload)
               state.todos=filterprd
            },
            savetodo: (state,action)=>{
                state.todos.find((item)=>{
                    if(item.id == action.payload.id){
                     item.value=action.payload.value
                     item.editkey=true

                    }
                })
              
            },
            }
        }
)
export const {addtodo,edittodo,deletetodo,savetodo} = todoSlice.actions

export default todoSlice.reducer
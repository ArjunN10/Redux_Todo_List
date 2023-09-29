import { configureStore } from "@reduxjs/toolkit";
import Todos from "./Todo";
export const store = configureStore({
    reducer:{
     list:Todos
    }
})
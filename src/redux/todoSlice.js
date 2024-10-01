import {createSlice} from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
const todoSlice = createSlice({
  name:"todoSlice",
  initialState:{
    tasks:[]
  },
  reducers:{
    addItem:(state, data)=>{
        state.tasks.push({
          id:uuidv4(),
          title:data.payload,
          completed : false
        })
      

    },
    markAsComplete:(state, data)=>{
      state.tasks = state.tasks.map((item) => {
      if(item.id === data.payload){
          item.completed = !item.completed;
        }
        return item;  
      });

    },
    deleteTask : (state, data)=>{
      state.tasks = state.tasks.filter((item)=>{
        return item.id !== data.payload;
      })
    }
  }
})

export default todoSlice.reducer;
export const {addItem, markAsComplete, deleteTask} = todoSlice.actions;

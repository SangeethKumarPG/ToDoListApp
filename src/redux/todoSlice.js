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
          title:data.payload.task,
          color:data.payload.color,
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
    },
    saveToLocalStore: (state)=>{
      if(state.tasks){
        localStorage.setItem("tasks",JSON.stringify(state.tasks));
        
      }
    },
    loadFromLocalStore : (state)=>{
      if(localStorage.getItem("tasks")){
        state.tasks = JSON.parse(localStorage.getItem("tasks"))

      }
    }
  }
})

export default todoSlice.reducer;
export const {addItem, markAsComplete, deleteTask, saveToLocalStore, loadFromLocalStore} = todoSlice.actions;

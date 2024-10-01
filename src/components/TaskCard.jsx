import React from 'react'
import './TaskCard.css'
import trashIcon from '../assets/trash-icon.svg'
import {useDispatch} from "react-redux";
import {markAsComplete, deleteTask} from '../redux/todoSlice'

function TaskCard({taskItem}) {
  const dispatch = useDispatch();
  const handleCheckBoxchange = () => {
    dispatch(markAsComplete(taskItem.id))
  }
  const handleDelete = () =>{
    dispatch(deleteTask(taskItem.id))
  } 
  return (
    <>
      <div className="container border border-light rounded-2 m-2 p-2 white-shadow d-flex justify-content-evenly align-items-center adjust-width"> 
            
            <input type="checkbox" className="form-check-input" id={`checkId-${taskItem.id}`} checked={taskItem.completed} onChange={handleCheckBoxchange} /> {" "}
            <label htmlFor={`checkId-${taskItem.id}`} className="form-check-label">{taskItem?.completed? <s>{taskItem?.title}</s>:taskItem?.title} </label>
        <button className="btn btn-transparent" onClick={handleDelete}>
        <img src={trashIcon} /></button>
        </div>

    </>
  )
}

export default TaskCard

import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'
import TaskCard from "./components/TaskCard"
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "@mui/material/Button";
import addIcon from './assets/add-icon.svg'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import ListIcon from '@mui/icons-material/List';
import {useSelector, useDispatch} from 'react-redux';
import {addItem} from "./redux/todoSlice"



function App() {
  const allTasks = useSelector((state)=>state.todo.tasks);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(allTasks)
  return (
    <>
      {
        allTasks?.length > 0 ? allTasks.map((item)=>(
          <div className="container mx-5 my-1 py-1 px-5 d-flex align-items-center justify-content-center">
            <TaskCard taskItem = {item}/>

          </div>

        )):<p>No Task To Display</p>
      }
      {/*<Button variant="contained" onClick={handleClickOpen} className="add-button"><img src={addIcon} /></Button>*/}


      <div className="menu-options">
        <div className="row position-fixed bottom-0 start-0 mb-3 ms-3">
          <div className="col-12 d-flex flex-column gap-2">
            <Fab color="primary" className="add-button" onClick={handleClickOpen} aria-label="add">
              <AddIcon />
            </Fab>

            <Fab className="completed-button mt-2" aria-label="completed">
              <CheckIcon />
            </Fab>

            <Fab className="all-task-button mt-2" aria-label="all tasks">
              <ListIcon />
            </Fab>
          </div>
        </div>
      </div>


      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          variant="dark"
          maxWidth="sm"
          PaperProps={{
            sx:{
              backgroundColor:"rgb(55,78,79)",
              color:"white"
            },
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              const taskTitle = event.target.taskName.value;
              dispatch(addItem(taskTitle));
              console.log(taskTitle);
              handleClose();
            },
          }}
        >
          <DialogTitle>Add Task</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              id="taskName"
              name="taskName"
              label="Add the task description"
              type="text"
              fullWidth
              variant="outlined"
              InputLabelProps={{
                sx:{color:"white"}
              }}
              InputProps={{
                sx: {
                  backgroundColor: "rgb(55,78,79)", // Input background
                  color: "white", // Text color
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white", // Default border color
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white", // Hover border color
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white", // Focused border color
                  },
                },
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="light">Cancel</Button>
            <Button type="submit" variant="light">Add Task</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>

    </>

  )
}

export default App

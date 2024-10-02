import { useState } from 'react';
import './App.css';
import React from 'react';
import TaskCard from './components/TaskCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import ListIcon from '@mui/icons-material/List';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, saveToLocalStore, loadFromLocalStore } from './redux/todoSlice';
import emptyList from './assets/empty-list.svg'
import SaveIcon from '@mui/icons-material/Save'; 
import LoadIcon from '@mui/icons-material/CloudDownload';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const allTasks = useSelector((state) => state.todo.tasks);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if(allTasks.length !==0 ){
        dispatch(saveToLocalStore());  
        toast.success("Data saved successfully!!")
    }else{
        toast.error("Nothing to save!");
    }
  } 
  const handleLoad = () => {
    dispatch(loadFromLocalStore());  
    if(localStorage.getItem("tasks") && localStorage.getItem("tasks").length !== 0){
         toast.success("Data loaded successfully!")
    }else{
      toast.error("No data found!")
    }
  }

  const toggleShowCompleted = () => {
    setShowCompletedTasks(!showCompletedTasks);
  };

  const handleShowAllTasks = () => {
    setShowCompletedTasks(false);
  };
  
  const [color, setColor] = useState("#000000");
  const onColorChange = (e) => {
    setColor(e.target.value);
  }
  return (
    <>
      {/* Displaying tasks */}
      {showCompletedTasks ? (
        <>
          <div className="container-fluid mb-2 w-100 white-shadow">
            <h2 className="jumbotron text-center">Completed Tasks</h2>
          </div>
          {allTasks?.filter((item) => item.completed).length > 0 ? (
            allTasks
              .filter((item) => item.completed)
              .map((item) => (
                <div className="container mx-5 my-1 py-1 px-5 d-flex align-items-center justify-content-center" key={item.id}>
                  <TaskCard taskItem={item} />
                </div>
              ))
          ) : (
              <div className="container d-flex align-items-center justify-content-center">
                <img src={emptyList}/>
                <p>No completed tasks to display</p>

              </div>
          )}
        </>
      ) : (
        <>
          <div className="container-fluid mb-2 w-100 white-shadow">
            <h2 className="jumbotron text-center">All Tasks</h2>
          </div>
          {allTasks?.length > 0 ? (
            allTasks.map((item) => (
              <div className="container mx-5 my-1 py-1 px-5 d-flex align-items-center justify-content-center" key={item.id}>
                <TaskCard taskItem={item} />
              </div>
            ))
          ) : (
           <div className="container d-flex align-items-center justify-content-center">
                <img src={emptyList}/>
                <p>No Tasks to display, add some new tasks</p>

              </div>          )}
        </>
      )}

      {/* Floating action buttons */}
     


<div>
  <div className="row position-fixed bottom-0 start-0 mb-3 ms-3">
    <div className="col-12 d-flex flex-row justify-content-center align-items-center gap-2">
      <Fab color="primary" className="add-button" onClick={handleClickOpen} aria-label="add">
        <AddIcon />
      </Fab>

      <Fab className="completed-button" onClick={toggleShowCompleted} aria-label="completed">
        <CheckIcon />
      </Fab>

      <Fab className="all-task-button" onClick={handleShowAllTasks} aria-label="all tasks">
        <ListIcon />
      </Fab>

      <Fab className="save-button" onClick={handleSave} aria-label="save">
        <SaveIcon /> {/* Make sure to import this icon */}
      </Fab>

      <Fab className="load-button" onClick={handleLoad} aria-label="load">
        <LoadIcon /> {/* Make sure to create or import a load icon */}
      </Fab>
    </div>
  </div>
</div>


      {/* Dialog for adding a task */}
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          maxWidth="md"
          PaperProps={{
            sx: {
              backgroundColor: 'rgb(55,78,79)',
              color: 'white',
            },
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              const taskTitle = event.target.taskName.value; 
              dispatch(addItem({task:taskTitle, color:color}));
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
              className="mt-2"
              id="taskName"
              name="taskName"
              label="Add the task description"
              type="text"
              fullWidth
              variant="outlined"
              InputLabelProps={{
                sx: { color: 'white' },
              }}
              InputProps={{
                sx: {
                  backgroundColor: 'rgb(55,78,79)',
                  color: 'white',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                },
              }}
            />
            <TextField
            label="Choose a color"
            type="color"
            className="mt-2"
            fullWidth
            value={color}
            onChange={onColorChange}
            InputLabelProps={{
                sx: { color: 'white' },
              }}
              InputProps={{
                sx: {
                  backgroundColor: 'rgb(55,78,79)',
                  color: 'white',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                },
              }}

            variant="outlined"/>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="light">
              Cancel
            </Button>
            <Button type="submit" variant="light">
              Add Task
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
      <ToastContainer autoClose={2000}/>
    </>
  );
}

export default App;

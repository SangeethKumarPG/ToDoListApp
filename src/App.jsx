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
import { addItem } from './redux/todoSlice';
import emptyList from './assets/empty-list.svg'

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

  const toggleShowCompleted = () => {
    setShowCompletedTasks(!showCompletedTasks);
  };

  const handleShowAllTasks = () => {
    setShowCompletedTasks(false);
  };

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
    </div>
  </div>
</div>


      {/* Dialog for adding a task */}
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          maxWidth="sm"
          PaperProps={{
            sx: {
              backgroundColor: 'rgb(55,78,79)',
              color: 'white',
            },
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              const taskTitle = event.target.taskName.value;
              dispatch(addItem(taskTitle));
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
    </>
  );
}

export default App;

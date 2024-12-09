import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SaveIcon from '@mui/icons-material/Save';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
  iconButton: {
    display: 'contents',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  success: {
    '&:hover': {
      color: theme.palette.success.main,
    },
  },
  error: {
    '&:hover': {
      color: theme.palette.error.main,
    },
  },
  warning: {
    '&:hover': {
      color: theme.palette.warning.main,
    },
  },
  importButton: {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.info.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.info.dark,
    },
  },
}));

const TaskList = ({ tasks, setTasks, onComplete, onDelete, onEdit, onAddTask }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  const handleAddTask = () => {
    if (!newTaskTitle || !newTaskDescription || !newTaskCategory) {
      console.error('All fields are required');
      return;
    }
    const formattedDueDate = newTaskDueDate ? new Date(newTaskDueDate).toISOString().split('T')[0] : null;
    if (editingTask) {
      onEdit(editingTask.id, newTaskTitle, newTaskDescription, newTaskCategory, formattedDueDate);
      Swal.fire({
        title: 'Task Updated',
        text: 'The task has been successfully updated.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } else {
      onAddTask(newTaskTitle, newTaskDescription, newTaskCategory, formattedDueDate);
      Swal.fire({
        title: 'Task Added',
        text: 'The task has been successfully added.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    }
    setNewTaskTitle('');
    setNewTaskDescription('');
    setNewTaskCategory('');
    setNewTaskDueDate('');
    setEditingTask(null);
    setIsModalOpen(false);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setNewTaskTitle(task.title);
    setNewTaskDescription(task.description);
    setNewTaskCategory(task.category);
    setNewTaskDueDate(task.due_date ? task.due_date.split('T')[0] : ''); // Asegurarse de que la fecha esté en el formato correcto
    setIsModalOpen(true);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleCompleteTask = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You are about to mark this task as completed!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, complete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        onComplete(id);
        Swal.fire(
          'Completed!',
          'The task has been marked as completed.',
          'success'
        );
      }
    });
  };

  const handleDeleteTask = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(id);
        Swal.fire(
          'Deleted!',
          'The task has been deleted.',
          'success'
        );
      }
    });
  };

  const exportTasks = () => {
    const dataStr = JSON.stringify(tasks, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'tasks.json';
    link.click();
  };

  const importTasks = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const importedTasks = JSON.parse(e.target.result);
      // Aquí puedes enviar las tareas importadas al backend o actualizarlas en el estado del frontend
      setTasks(importedTasks);
    };
    reader.readAsText(file);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const filteredTasks = selectedCategory
    ? tasks.filter((task) => task.category === selectedCategory)
    : tasks;

  return (
    <div className="w-full h-full">
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsModalOpen(true)}
        className="mb-4"
      >
        Add New Task
      </Button>
      <Button variant="contained" color="secondary" onClick={exportTasks}>
        Export Tasks
      </Button>
      <input type="file" onChange={importTasks} style={{ display: 'none' }} id="import-tasks" />
      <label htmlFor="import-tasks">
      </label>
      <Button variant="contained" color="default" onClick={handleLogout}>
        Logout
      </Button>

      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Category</InputLabel>
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          label="Category"
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value="Work">Work</MenuItem>
          <MenuItem value="Personal">Personal</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
      </FormControl>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Edit</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Due Date</TableCell> {/* Agregar columna de fecha límite */}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>
                  <IconButton
                    className={`${classes.iconButton} ${classes.warning}`}
                    onClick={() => handleEditTask(task)}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.category}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>{task.due_date ? task.due_date.split('T')[0] : 'N/A'}</TableCell> {/* Mostrar fecha límite */}
                <TableCell>
                  <IconButton
                    className={`${classes.iconButton} ${classes.success}`}
                    onClick={() => handleCompleteTask(task.id)}
                    disabled={task.status === 'completed'} // Deshabilitar si la tarea está completada
                  >
                    <CheckCircleIcon />
                  </IconButton>
                  <IconButton
                    className={`${classes.iconButton} ${classes.error}`}
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogTitle>{editingTask ? 'Edit Task' : 'Add New Task'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the details of the task.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Task Title"
            type="text"
            fullWidth
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Task Description"
            type="text"
            fullWidth
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              value={newTaskCategory}
              onChange={(e) => setNewTaskCategory(e.target.value)}
              label="Category"
            >
              <MenuItem value="Work">Work</MenuItem>
              <MenuItem value="Personal">Personal</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Due Date"
            type="date"
            fullWidth
            value={newTaskDueDate}
            onChange={(e) => setNewTaskDueDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddTask} color="primary" startIcon={<SaveIcon />}>
            {editingTask ? 'Save Changes' : 'Add Task'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TaskList;
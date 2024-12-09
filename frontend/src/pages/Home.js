import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import TaskList from '../components/TaskList';
import axios from 'axios';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from '../themes';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async (title, description, category, due_date) => {
    if (!title || !description || !category) {
      console.error('All fields are required');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:8000/api/tasks',
        { title, description, status: 'pending', category, due_date },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const completeTask = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const task = tasks.find(task => task.id === id);
      if (!task) {
        console.error('Task not found');
        return;
      }
      const formattedDueDate = task.due_date ? new Date(task.due_date).toISOString().split('T')[0] : null;
      await axios.put(
        `http://localhost:8000/api/tasks/${id}`,
        { ...task, status: 'completed', due_date: formattedDueDate },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchTasks();
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const editTask = async (id, title, description, category, due_date) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:8000/api/tasks/${id}`,
        { title, description, status: 'pending', category, due_date },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchTasks();
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const appliedTheme = createTheme(theme === 'light' ? lightTheme : darkTheme);

  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline />
      <Header theme={appliedTheme} toggleTheme={toggleTheme} />
      <main className="p-4">
        <TaskList
          tasks={tasks}
          setTasks={setTasks}
          onComplete={completeTask}
          onDelete={deleteTask}
          onEdit={editTask}
          onAddTask={addTask}
        />
      </main>
    </ThemeProvider>
  );
};

export default Home;
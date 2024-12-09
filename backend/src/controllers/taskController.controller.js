import taskModel from '../models/taskModel.model.js';

export const getTasks = (req, res) => {
  taskModel.getTasks((err, tasks) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(tasks);
  });
};

export const createTask = (req, res) => {
  const { title, description, status, category, due_date } = req.body;
  const user_id = req.user.id; // Obtener el ID del usuario autenticado
  if (!title || !description || !status || !category) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const newTask = { title, description, status, category, due_date, user_id };
  taskModel.createTask(newTask, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Task created successfully', taskId: result.insertId });
  });
};

export const updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, status, category, due_date } = req.body;
  if (!title || !description || !status || !category) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const updatedTask = { title, description, status, category, due_date };
  taskModel.updateTask(id, updatedTask, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Task updated successfully' });
  });
};

export const deleteTask = (req, res) => {
  const { id } = req.params;
  taskModel.deleteTask(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Task deleted successfully' });
  });
};
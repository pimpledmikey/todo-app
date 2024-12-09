import { connectDB } from '../config/db.js';
const connection = connectDB();

const getTasks = (callback) => {
  const query = 'SELECT * FROM tasks';
  connection.query(query, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

const createTask = (task, callback) => {
  const query = 'INSERT INTO tasks (title, description, status, category, created_at, due_date, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [task.title, task.description, task.status, task.category, new Date(), task.due_date, task.user_id];
  connection.query(query, values, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

const updateTask = (id, task, callback) => {
  const query = 'UPDATE tasks SET title = ?, description = ?, status = ?, category = ?, due_date = ? WHERE id = ?';
  const values = [task.title, task.description, task.status, task.category, task.due_date, id];
  connection.query(query, values, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

const deleteTask = (id, callback) => {
  const query = 'DELETE FROM tasks WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

export default {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
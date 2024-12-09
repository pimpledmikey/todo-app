import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});

console.log('Connecting to MySQL...');

// Crear la base de datos
connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`, (err, result) => {
  if (err) {
    console.error('Error creating database:', err);
    process.exit(1);
  } else {
    console.log('Database created or already exists');
  }

  // Conectar a la base de datos específica
  connection.changeUser({ database: process.env.DB_NAME }, (err) => {
    if (err) {
      console.error('Error changing database:', err);
      process.exit(1);
    } else {
      console.log(`Connected to database ${process.env.DB_NAME}`);
    }

    // Crear la tabla de usuarios
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      )
    `;

    connection.query(createUsersTable, (err, result) => {
      if (err) {
        console.error('Error creating users table:', err);
        process.exit(1);
      } else {
        console.log('Users table created or already exists');
      }
    });

    // Crear la tabla de tareas
    const createTasksTable = `
      CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status ENUM('pending', 'completed') DEFAULT 'pending',
        category VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        due_date DATE,
        user_id INT,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `;

    connection.query(createTasksTable, (err, result) => {
      if (err) {
        console.error('Error creating tasks table:', err);
        process.exit(1);
      } else {
        console.log('Tasks table created or already exists');
      }
      connection.end();
    });
  });
});
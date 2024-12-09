import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = () => {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      process.exit(1);
    } else {
      console.log('Connected to the MySQL database');
    }
  });

  return connection;
};

export { connectDB };
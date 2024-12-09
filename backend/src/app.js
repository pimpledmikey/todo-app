import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.router.js';
import userRoutes from './routes/userRoutes.router.js';
import { errorHandler } from './middleware/errorMiddleware.middleware.js';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Conectar a la base de datos
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

// Middleware de manejo de errores (siempre al final)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
import jwt from 'jsonwebtoken';
import { connectDB } from '../config/db.js';

const connection = connectDB();

const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const query = 'SELECT * FROM users WHERE id = ?';
      connection.query(query, [decoded.id], (err, results) => {
        if (err || results.length === 0) {
          return res.status(401).json({ message: 'Not authorized' });
        }
        req.user = results[0];
        next();
      });
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export { protect };
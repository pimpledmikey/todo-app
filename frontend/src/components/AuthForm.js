import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField, Typography, Link } from '@mui/material';
import Swal from 'sweetalert2';

const AuthForm = ({ isLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.add('dark');
    return () => {
      document.documentElement.classList.remove('dark');
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin && (!name || !email || !password)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'All fields are required!',
      });
      return;
    }

    if (isLogin && (!email || !password)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Email and password are required!',
      });
      return;
    } try {
      if (isLogin) {
        const response = await axios.post('http://localhost:8000/api/users/login', { email, password });
        localStorage.setItem('token', response.data.token);
        Swal.fire({
          icon: 'success',
          title: 'Login successful',
        });
        document.documentElement.classList.remove('dark');
        navigate('/');
      } else {
        await axios.post('http://localhost:8000/api/users/register', { name, email, password });
        Swal.fire({
          icon: 'success',
          title: 'Registration successful',
        });
        navigate('/login');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong!',
      });
      console.error('Error:', error);
    }
  };

  return (
    <div className="background">
      <div className="shape"></div>
      <div className="shape"></div>
      <form onSubmit={handleSubmit}>
        <Typography variant="h3" component="h3" gutterBottom>
          {isLogin ? 'Login' : 'Register'}
        </Typography>
        {!isLogin && (
          <>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputLabelProps={{
                style: { color: 'white' },
              }}
              InputProps={{
                style: { color: 'white' },
                disableUnderline: true,
              }}
              required
            />
          </>
        )}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputLabelProps={{
            style: { color: 'white' },
          }}
          InputProps={{
            style: { color: 'white' },
            disableUnderline: true,
          }}
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputLabelProps={{
            style: { color: 'white' },
          }}
          InputProps={{
            style: { color: 'white' },
            disableUnderline: true,
          }}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '20px' }}
        >
          {isLogin ? 'Log In' : 'Register'}
        </Button>
        <div className="mt-4 text-center text-white dark:text-black">
          {isLogin ? (
            <Typography variant="body2">
              Don't have an account? <Link href="/register" color="secondary">Register</Link>
            </Typography>
          ) : (
            <Typography variant="body2">
              Already have an account? <Link href="/login" color="secondary">Login</Link>
            </Typography>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
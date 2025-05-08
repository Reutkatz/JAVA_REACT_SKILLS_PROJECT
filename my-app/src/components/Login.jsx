
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import { setUser } from '../features/reducers/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ userName: '', password: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const loginCheck = async (user) => {
    try {
      await dispatch(setUser(user)).unwrap();
      navigate('/');
    } catch (err) {
      console.log(err);

      if (err.message === "Request failed with status code 404") {
        alert('User not found. Redirecting to sign up...');
        navigate('/signup');
      } else if (err.message === 'Request failed with status code 401') {
        alert('Incorrect password');
      } else {
        alert('An error occurred: ' + err.response.status);
      }

    };
  }
  const onSubmit = (e) => {
    e.preventDefault();
    loginCheck(formData);
  };

  return (
    <>
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(to bottom, #A1887F, rgba(0,0,0,0.3)), url(/path-to-background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Container
          maxWidth="xs"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '16px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            padding: 4,
          }}
        >
          <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
            Log into your account
          </Typography>
          <form onSubmit={onSubmit}>
            <TextField
              type="text"
              name="userName"
              placeholder="userName"
              value={formData.userName}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              sx={{
                '& input': { fontSize: '1rem' },
              }}
            />
            <TextField
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              sx={{
                '& input': { fontSize: '1rem' },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                marginTop: 3,
                backgroundColor: '#000',
                color: '#fff',
                padding: '10px 0',
                '&:hover': { backgroundColor: '#333' },
              }}
            >
              Log In
            </Button>
            <Typography
              variant="body2"
              align="center"
              sx={{ marginTop: 2, color: '#555' }}
            >
              Don’t have an account?{' '}
              <Typography
                component="a"
                href="/SignUp"
                sx={{
                  color: "#A1887F",
                  textDecoration: 'none',
                  fontWeight: 'bold',
                }}
              >
                Sign Up
              </Typography>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
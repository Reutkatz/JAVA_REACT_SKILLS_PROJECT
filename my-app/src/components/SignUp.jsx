
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../features/reducers/userSlice';
import { Box, TextField, Button, Typography, Container, Alert } from '@mui/material';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    phoneNumber: '',
    country: '',
    image: null,
    about: '',
    skills: '',
    responses: '',
    interestFields: '',
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(formData))
      .unwrap()
      .then(() => {
        setSuccess(true);
        setFormData({
          userName: '',
          email: '',
          password: '',
          phoneNumber: '',
          country: '',
          image: null,
          about: '',
          skills: '',
          responses: '',
          interestFields: '',
        });
        navigate('/Login');
      })
      .catch(() => setSuccess(false));
  };

  return (
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
          Create your account
        </Typography>
        <form onSubmit={onSubmit}>
          {success && <Alert severity="success">User registered successfully!</Alert>}

          <TextField
            type="text"
            name="userName"
            placeholder="Your Name"
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
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
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
          <TextField
            type="phone"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            inputProps={{
              maxLength: 10,
              minLength: 10,
            }}
            sx={{
              '& input': { fontSize: '1rem' },
            }}
          />
          <Typography
            variant="body2"
            align="center"
            sx={{
              color: '#555',
              marginTop: 2,
              fontSize: '0.8rem',
            }}
          >
            By signing up, you agree to the terms of service and privacy policy.
          </Typography>
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
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Registering...' : 'Sign Up'}
          </Button>
          <Typography
            variant="body2"
            align="center"
            sx={{
              marginTop: 2,
              color: '#555',
            }}
          >
            Already have an account?{' '}
            <Typography
              component="a"
              href="/login"
              sx={{
                color: "#A1887F",
                textDecoration: 'none',
                fontWeight: 'bold',
              }}
            >
              Log In
            </Typography>
          </Typography>
        </form>
      </Container>
    </Box>
  );
};

export default SignUp;
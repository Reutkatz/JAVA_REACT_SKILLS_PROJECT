
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../features/reducers/userSlice';
import { getInterestFields } from '../../features/reducers/interestFieldSlice';
import { Box, Typography, Avatar, Card, CardContent } from '@mui/material';
import './users.css'
const UserComponent = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const userStatus = useSelector((state) => state.user.status);
  const interestFields = useSelector((state) => state.interestField.interestFields);
  const interestFieldsStatus = useSelector((state) => state.interestField.status);

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(getUsers());
    }
    if (interestFieldsStatus === 'idle') {
      dispatch(getInterestFields());
    }

  }, [dispatch, userStatus, interestFieldsStatus]);

  return (
    <Box sx={{ padding: 4, minHeight: '100vh' }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ color: '#fff' }}>
        Users Gallery
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          justifyContent: 'center',
        }}
      >
        {userStatus === 'succeeded' &&
          interestFieldsStatus === 'succeeded' &&
          Array.isArray(users) &&
          users.map((user) => {

            const userInterestFields =
              interestFields.filter(
                (field) => field.user.id === user.id
              );

            return (
              <Card
                key={user.id}
                sx={{
                  minWidth: 220,
                  maxWidth: 250,
                  height: 380,
                  textAlign: 'center',
                  borderRadius: '16px',
                  boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
                  '&:hover': { transform: 'scale(1.05)', transition: '0.3s' },
                }}
              >
                <CardContent>
                  <Avatar
                    src={`data:image/png;base64,${user.image}`}
                    alt={user.userName.toUpperCase()}
                    sx={{
                      width: 90,
                      height: 90,
                      margin: '0 auto 10px',
                      border: '4px solid #fff',
                    }}
                  />
                  <Typography variant="h6" sx={{ color: 'brown', fontWeight: 600 }}>
                    {user.userName}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'brown' }}>
                    phone Number: {user.phoneNumber}
                  </Typography>
                  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet"></link>
                  <a href={`https://wa.me/${user.phoneNumber}?text=שלום,%20אני%20מעוניין%20בפרטים%20נוספים`}
                    target="_blank"
                    className="whatsapp-link">
                    <i class="fab fa-whatsapp"></i>
                  </a>
                  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet"></link>
                  <a href={`tel:${user.phoneNumber}`} className="phone-link">
                    <i class="fas fa-phone"></i>
                  </a>
                  <Typography variant="body2" sx={{ color: 'brown' }}>
                    country: {user.country}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'brown', fontSize: '0.875rem', marginBottom: 2 }}>
                    {user.about || 'No description provided'}
                  </Typography>
                  <Box>
                    <Typography variant="body2" sx={{ color: 'brown', fontWeight: 600 }}>
                      Interests:</Typography>
                    <Typography variant="body2" sx={{ color: 'brown', fontSize: '0.875rem' }}>
                      {userInterestFields.length > 0
                        ? userInterestFields.map((field) => field.fieldName).join(', ')
                        : 'No interests available'}
                    </Typography>
                  </Box>

                </CardContent>
              </Card>
            );
          })}
      </Box>
    </Box>
  );
};

export default UserComponent;
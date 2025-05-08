import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCategorysDTO } from '../features/reducers/categorySlice';
import { Grid, Card, CardContent, Typography, Container } from '@mui/material';

import { useNavigate } from 'react-router-dom';
const CategoryComponent = () => {
  const dispatch = useDispatch();
  const categorys = useSelector((state) => state.category.categorysDTO);
  const status = useSelector((state) => state.category.statusDTO);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getCategorysDTO());
    }
  }, [status, dispatch]);

  const handleCardClick = (categoryId) => {
    navigate(`/skills/${categoryId}`);
  }

  return (
    <Container sx={{ textAlign: 'center', padding: 4 }}>
      <Grid container spacing={2} justifyContent="center">
        {status === 'succeeded' && Array.isArray(categorys) && categorys.map(category => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={category.id}>
            <Card
              variant="outlined"
              sx={{
                height: 250,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: `url(data:image/png;base64,${category.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: 'white',
                overflow: 'hidden',
                borderRadius: 2,
                borderBlockColor: 'black',
              }}
              onClick={() => handleCardClick(category.id)}
            >
              <CardContent sx={{
                textAlign: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: 1,
                padding: 2,
              }}>
                <Typography variant="h6" component="div">{category.name}</Typography>
                <Typography variant="body2" color="inherit">
                  {category.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CategoryComponent;

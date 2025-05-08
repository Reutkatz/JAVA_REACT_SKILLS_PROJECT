
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, TextField, Button, Typography, Container, Select, MenuItem, FormControl, InputLabel, IconButton } from '@mui/material';
import { addSkill } from '../../features/reducers/skillSlice';
import { getCategorys } from '../../features/reducers/categorySlice';
import { getImages, upload } from '../../features/reducers/imageSlice';
import { useNavigate } from 'react-router-dom';

const SkillUploader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"))
  const categories = useSelector((state) => state.category.categorys);
  const status = useSelector((state) => state.category.status);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [ID, setID] = useState('');
  const [isUploadingImage, setIsUploadingImage] = useState(false);


  const [formData, setFormData] = useState({
    user: user || '',
    name: '',
    category: '',
    level: '',
    uploadDate: new Date().toISOString() || '',
    description: '',
  });

  const [isFetched, setIsFetched] = useState(false);
  useEffect(() => {
    if (status === 'idle') {
      dispatch(getCategorys());
    }
  }, [status, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      if (!isFetched) {
        await dispatch(getImages(user?.id)).unwrap();
        setIsFetched(true);
      }
    };
    fetchData();
  }, [dispatch, isFetched, user?.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.level || !formData.category) {
      alert('All fields are required!');
      return;
    }
    if (user) {
      try {
        const res = await dispatch(addSkill(formData)).unwrap();
        console.log(res.id);
        setID(res.id);
        setIsUploadingImage(true);
        setFormData({ user: user || '', name: '', category: '', level: '', description: '' });
      } catch (error) {
        console.error('Error adding skill:', error);
        alert('Failed to add skill: ' + error.message);
      }
    }
    else {
      alert('אתה לא מחובר. לחץ OK כדי לעבור לדף ההתחברות.');
      window.location.href = '/login';
    }
  };
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => (file));
    setUploadedImages((prev) => [...prev, ...newImages]);
  };

  const handleFinishUpload = async () => {
    for (const image of uploadedImages) {
      const imageData = new FormData();

      imageData.append('image', new Blob(
        [JSON.stringify({
          id: '',
          image: '',
          skill: { id: ID },
        })],
        { type: 'application/json' }
      )
      );
      imageData.append('file', image);
      try {
        await dispatch(upload(imageData)).unwrap();
        console.log(`Uploaded image successfully!`);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
    navigate('/ShowYourSkills');
  };
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), rgba(0,0,0,0.3)), url(/path-to-background.jpg)',
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
        <Typography
          variant="h5"
          gutterBottom
          align="center"
          sx={{ fontWeight: 'bold', marginBottom: 3 }}
        >
          {isUploadingImage ? 'Upload Skill Image' : 'Add New Skill'}
        </Typography>
        <form onSubmit={handleSubmit}>
          {!isUploadingImage && (
            <>
              <TextField
                label="Skill Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                sx={{ '& input': { fontSize: '1rem' } }}
              />
              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                multiline
                rows={3}
                sx={{ '& textarea': { fontSize: '1rem' } }}
              />
              <TextField
                label="Level"
                name="level"
                value={formData.level}
                onChange={handleInputChange}
                type="number"
                InputProps={{ inputProps: { min: 1, max: 10 } }}
                fullWidth
                margin="normal"
                sx={{ '& input': { fontSize: '1rem' } }}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  marginTop: 3,
                  backgroundColor: '#000',
                  color: '#fff',
                  padding: '10px 0',
                  '&:hover': { backgroundColor: '#333' },
                }}
              >
                Next
              </Button>
            </>
          )}

          {isUploadingImage && (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                multiple
                style={{ display: 'block', margin: '10px auto' }}
              />
              <Button
                type="button"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  marginTop: 3,
                  backgroundColor: '#000',
                  color: '#fff',
                  padding: '10px 0',
                  '&:hover': { backgroundColor: '#333' },
                }}
                onClick={handleFinishUpload}
              >
                Finish Uploading
              </Button>
            </>
          )}

          <div>
            {uploadedImages.map((image, index) => (
              <img
                key={index}
                src={URL.createObjectURL(image)}
                alt={`Uploaded ${index + 1}`}
                style={{ width: 100, height: 100, margin: 10 }}
              />
            ))}
          </div>
        </form>
      </Container>
    </Box>

  );
};

export default SkillUploader;
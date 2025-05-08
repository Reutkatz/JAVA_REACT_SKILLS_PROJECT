import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserDTOById, updateUser, upload } from '../features/reducers/userSlice';
import { addInterestField, delleteInterestField, getInterestFieldByName, getInterestFieldsByUserId } from '../features/reducers/interestFieldSlice';
import { Box, TextField, Button, Typography, Container, IconButton, Avatar } from '@mui/material';
import Select from "react-select";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import CountryList from 'react-select-country-list';
import { isUpdateImage } from './NavPages/NavComponent';

const CreateProfile = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"))
  const [image, setImage] = useState('');
  const [formData, setFormData] = useState({
    id: user?.id || '',
    userName: user?.userName || '',
    email: user?.email || '',
    password: user?.password || '',
    phoneNumber: user?.phoneNumber || '',
    country: user?.country || '',
    about: user?.about || '',
    skills: '', responses: '',
    interestFields: user?.interestFields || [],
  });

  const [selectedCountry, setSelectedCountry] = useState(null);
  const countries = CountryList().getData();

  const handleChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setFormData({ ...formData, country: JSON.stringify(selectedOption.label) })
    console.log("Selected country:", selectedOption);
  };

  const [currentInterest, setCurrentInterest] = useState('');
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user && user.userName && !isFetched) {
          const profile = await dispatch(getUserDTOById(user.id)).unwrap();
          const dataUrl = `data:image/png;base64,${profile.image}`;
          setImage(dataUrl)
          const interests = await dispatch(getInterestFieldsByUserId(user.id)).unwrap();
          setFormData({
            id: user.id,
            userName: user.userName,
            email: user.email,
            password: user.password,
            phoneNumber: user.phoneNumber,
            country: user.country,
            image: null,
            about: user.about,
            interestFields: interests.map((field) => field.fieldName),
          });
          setIsFetched(true);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [user, isFetched, dispatch]);


  const handleAddInterest = async () => {
    if (currentInterest.trim() === '') {
      alert('Interest field cannot be empty');
      return;
    }

    try {
      console.log({ user: { id: formData.id }, fieldName: currentInterest.trim() });
      const response = await dispatch(
        addInterestField({ user: { id: formData.id }, fieldName: currentInterest.trim() })
      ).unwrap();
      setFormData((prev) => ({
        ...prev,
        interestFields: [...prev.interestFields, response.fieldName || currentInterest.trim()],
      }));
      setCurrentInterest('');
    } catch (error) {
      alert('Failed to add interest field: ' + error.message);
    }
  };

  const handleRemoveInterest = async (index) => {
    const interestToRemove = formData.interestFields[index];

    try {
      const response = await dispatch(getInterestFieldByName({ name: interestToRemove, userName: formData.userName })).unwrap();
      const interest = response.id;
      console.log(interest);
      await dispatch(delleteInterestField(interest)).unwrap();

      setFormData((prev) => ({
        ...prev,
        interestFields: prev.interestFields.filter((_, i) => i !== index),
      }));
    } catch (error) {
      alert('Failed to remove interest field: ' + error.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append(
      'user',
      new Blob(
        [JSON.stringify({
          id: formData.id,
          userName: formData.userName,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phoneNumber,
          country: formData.country,
          about: formData.about,
          skills: formData.skills,
          responses: formData.responses,
        })],
        { type: 'application/json' }
      )
    );
    formDataToSend.append('image', formData.image);

    console.log('FormData to send:', formDataToSend);
    if (formData.image) {
      try {
        const result = await dispatch(upload(formDataToSend)).unwrap();
        isUpdateImage();
        console.log('Upload successful:', result);
        alert('Profile updated successfully!');
      } catch (error) {
        console.error('Error during upload:', error.message);
        alert('Failed to upload image: ' + error.message);
      }
    }
    else {
      try {
        const orderedFormData = {
          id: formData.id,
          userName: formData.userName,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phoneNumber,
          country: formData.country,
          about: formData.about,
          skills: formData.skills,
          responses: formData.responses,
          interestFields: '',
        };
        console.log('Ordered Form Data:', orderedFormData);

        await dispatch(updateUser({ id: formData.id, user: orderedFormData })).unwrap();
        alert('Profile Updated Successfully!');

      } catch (error) {
        console.error('Error during profile update:', error.message);
        alert('Failed to update profile: ' + error.message);
      }
    }
  };
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    console.log(JSON.stringify(file));
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImage(URL.createObjectURL(file));
    }
  };


  return (
    <Container
      sx={{
        maxWidth: 360,
        padding: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          marginBottom: 2,
          fontWeight: 600,
          color: '#333',
        }}
      >
        Update Your Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ marginBottom: 2 }}>
          {image && (
            <Avatar
              src={image}
              alt={user.userName.toUpperCase()}
              sx={{ width: 80, height: 80, margin: '0 auto', marginBottom: 1 }}
            />
          )}
          <Button
            variant="contained"
            component="label"
            sx={{
              backgroundColor: '#333',
              color: '#fff',
              textTransform: 'none',
              borderRadius: '20px',
              padding: '8px 16px',
              ':hover': { backgroundColor: '#555' },
            }}
          >
            Upload Image
            <input type="file" accept="image/*" hidden onChange={handleFileChange} />
          </Button>
        </Box>
        <TextField
          label="User Name"
          value={formData.userName}
          fullWidth
          margin="normal"
          disabled
          sx={{
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
          }}
        />
        <TextField
          label="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          fullWidth
          margin="normal"
          sx={{
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
          }}
        />
        <TextField
          label="Phone Number"
          value={formData.phoneNumber}
          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          fullWidth
          margin="normal"
          sx={{
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
          }}
        />
        <div>
          <h3>Select a Country</h3>
          <Select

            options={countries}
            onChange={handleChange}
            placeholder={formData.country || "Choose your country"}
          />
          {selectedCountry && (
            <p>
              You selected: {selectedCountry.label} ({selectedCountry.value})
            </p>

          )}
        </div>

        <TextField
          label="About"
          value={formData.about}
          onChange={(e) => setFormData({ ...formData, about: e.target.value })}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          sx={{
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
          }}
        />

        <Box sx={{ marginTop: 2 }}>
          <Typography
            variant="body1"
            sx={{
              marginBottom: 1,
              fontWeight: 500,
              color: '#555',
            }}
          >
            Interest Fields
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
            <TextField
              label="Add Interest"
              value={currentInterest}
              onChange={(e) => setCurrentInterest(e.target.value)}
              fullWidth
              margin="normal"
              sx={{
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
              }}
            />
            <IconButton color="black" onClick={handleAddInterest}>
              <AddCircleIcon />
            </IconButton>
          </Box>

          <Box>
            {formData.interestFields.map((interest, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 1,
                  padding: 1,
                  backgroundColor: '#f0f0f0',
                  borderRadius: '8px',
                }}
              >
                <Typography>{interest}</Typography>
                <IconButton color="error" onClick={() => handleRemoveInterest(index)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          </Box>
        </Box>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            marginTop: 2,
            backgroundColor: '#333',
            color: '#fff',
            textTransform: 'none',
            borderRadius: '20px',
            ':hover': { backgroundColor: '#555' },
          }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default CreateProfile;

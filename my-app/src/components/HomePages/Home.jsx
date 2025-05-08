
import React from 'react';
import { Box } from '@mui/material';
import './Home.css';

const Home = () => {
  return (
    <Box className="homeContainer">
      <video
        autoPlay
        muted
        loop
        className="backgroundVideo"
      >
        <source src="./video/Untitled design.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Box>
        <h1>
          Skills Shared for you <span className="onlineText">-Online</span>
        </h1>
      </Box>
    </Box>
  );
};

export default Home;
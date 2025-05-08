import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';

const FooterContainer = styled(Box)({
  backgroundColor: '#fad0c4',
  color: 'white',
  padding: '30px 20px',
  textAlign: 'center',
  borderTop: '3px solid #f06292',
  width: '100%',
  marginTop: 'auto',
});


const SocialIcons = styled(Box)({
  marginTop: '10px',
  display: 'flex',
  justifyContent: 'center',
  gap: '15px',
});

const Footer = () => {
  return (
    <FooterContainer>
      <Typography variant="h6" gutterBottom>
        "© All rights reserved. Reut Katzburg."    </Typography>
      <Typography variant="body2" gutterBottom>
        A platform for sharing skills between people, improving abilities and exchanging knowledge.</Typography>
      <SocialIcons>
        <IconButton href="https://facebook.com" target="_blank" aria-label="Facebook" sx={{ color: 'white' }}>
          <FacebookIcon />
        </IconButton>
        <IconButton href="https://instagram.com" target="_blank" aria-label="Instagram" sx={{ color: 'white' }}>
          <InstagramIcon />
        </IconButton>
        <IconButton href="mailto:skills@example.com" aria-label="Email" sx={{ color: 'white' }}>
          <EmailIcon />
        </IconButton>
      </SocialIcons>
      <Typography variant="body2" sx={{ marginTop: '15px', fontSize: '0.8rem' }}>
        Designed with ❤️ by Reut
      </Typography>
    </FooterContainer>
  );
};

export default Footer;
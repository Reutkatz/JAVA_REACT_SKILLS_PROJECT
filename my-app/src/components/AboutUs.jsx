import { Container, Grid, Typography, Box, Button, IconButton } from '@mui/material';
import React, { useRef, useState } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

const AboutUs = () => {

    const user = JSON.parse(localStorage.getItem("user"))

    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    }

    return (
        <Container maxWidth="lg" sx={{ padding: '50px 0' }}>
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
                    <Box
                        sx={{
                            width: '100%',
                            height: 250,
                            borderRadius: '10px',
                            overflow: 'hidden',
                            position: 'relative',
                        }}
                    >
                        <video
                            ref={videoRef}
                            autoPlay
                            loop
                            playsInline
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        >
                            <source
                                src="./video/skill-site (2).mp4"
                                type="video/mp4"
                            />
                            Your browser does not support the video tag.
                        </video>

                        <IconButton
                            onClick={handlePlayPause}
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                color: 'white',
                                width: '60px',
                                height: '60px',
                                borderRadius: '50%',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                },
                            }}
                        >
                            {isPlaying ? (
                                <PauseIcon sx={{ fontSize: '36px' }} />
                            ) : (
                                <PlayArrowIcon sx={{ fontSize: '36px' }} />
                            )}
                        </IconButton>
                    </Box>
                </Grid>

                <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="h4" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
                        A little about us          </Typography>
                    <Typography variant="body1" sx={{ marginBottom: '20px' }}>
                        We are a skilled team in the field of technology and innovation, and our goal is to make it easy for you to share your skills and learn from the experience of others.
                        We believe that we can all learn from each other and develop in a collaborative environment. Every skill is worth sharing, and together we can create a positive and inspiring community.         </Typography>
                    <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                        "Your knowledge can light the way for other people, thus making the world a better place."          </Typography>
                </Grid>
            </Grid>

            <Box sx={{ marginTop: '50px', textAlign: 'center' }}>
                <Typography variant="h5" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
                    So how do you join us?        </Typography>
                <Typography variant="body1" sx={{ marginBottom: '20px' }}>
                    Register on our site and start sharing your skills with the world. Our community is open to everyone and waiting to hear what you have to offer!        </Typography>
                {!user && (
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        href="/signup"
                        sx={{
                            padding: '10px 30px', borderRadius: '25px', fontWeight: 'bold', color: "#fff", backgroundColor: '#000', '&:hover': { backgroundColor: '#333' }
                        }}
                    >
                        Sign Up now!        </Button>)}
            </Box>
        </Container>
    );
};

export default AboutUs;

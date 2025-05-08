import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

import './Skill.css';


const AddSkill = () => {
    const navigate = useNavigate();
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });
    return (
        <>
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                sx={{

                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 30,
                    backgroundColor: '#000',
                    color: '#fff',
                    padding: '10px 0',
                    '&:hover': { backgroundColor: '#333' },
                }}
                startIcon={<CloudUploadIcon />}
            >
                Upload skill
                <VisuallyHiddenInput
                    onClick={() => { navigate('/SkillUploaderComponent') }}
                    multiple
                />
            </Button>
        </>
    );
};

export default AddSkill;
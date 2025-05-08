import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSkills, delleteSkill, updateSkill } from '../../features/reducers/skillSlice';
import { delleteImage, getImages, upload } from '../../features/reducers/imageSlice';
import { delleteResponse, getResponses } from '../../features/reducers/responseSlice';
import { getUsers } from '../../features/reducers/userSlice';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, IconButton, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import './Skill.css';


const ShowSkillsComponent = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"))
  const users = useSelector((state) => state.user.users);
  const skills = useSelector((state) => state.skill.skills);
  const skillStatus = useSelector((state) => state.skill.status);
  const responses = useSelector((state) => state.response.responses);
  const responsesStatus = useSelector((state) => state.response.status);
  const SkillImages = useSelector((state) => state.image.images);
  const SkillImagesStatus = useSelector((state) => state.image.status);
  const userStatus = useSelector((state) => state.user.status);
  const [open, setOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedLevel, setUpdatedLevel] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (skillStatus === 'idle') {
      dispatch(getSkills()).unwrap();
    }
    if (userStatus === 'idle') {
      dispatch(getUsers()).unwrap();
    }
    if (!SkillImages.length) {
      dispatch(getImages()).unwrap();
    }
    if (responsesStatus === 'idle') {
      dispatch(getResponses()).unwrap();
    }
  }, [dispatch, skillStatus, SkillImages, userStatus, SkillImagesStatus]);

  const filteredSkills = useMemo(
    () =>
      skills.filter(
        (skill) =>
          skill.user.id === user.id
      ),
    [skills, user]
  );
  const usersImages = useMemo(() => {
    const imageMap = {};
    users.forEach((user) => {
      imageMap[user.id] = `data:image/png;base64,${user.image}`;
    });
    return imageMap;
  }, [users])

  const handleNextImage = (skillId, imagesLength) => {
    setCurrentImageIndex((prevState) => ({
      ...prevState,
      [skillId]: Math.min((prevState[skillId] || 0) + 1, imagesLength - 1),
    }));
  };

  const handlePrevImage = (skillId) => {
    setCurrentImageIndex((prevState) => ({
      ...prevState,
      [skillId]: Math.max((prevState[skillId] || 0) - 1, 0),
    }));
  };

  const delletedSkill = async (skillID, images, comments) => {
    await images.map((image) => { dispatch(delleteImage(image.id)) });
    await comments.map((comment) => { dispatch(delleteResponse(comment.id)) })
    await dispatch(delleteSkill(skillID)).unwrup();
    console.log("delleted succesfully!");
  }

  const handleClickOpen = (skill) => {
    setEditingSkill(skill);
    setUpdatedDescription(skill.description);
    setUpdatedLevel(skill.level);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingSkill(null);
  };

  const handleUpdateSkill = () => {
    if (editingSkill) {
      const updatedSkill = { ...editingSkill, description: updatedDescription, level: parseInt(updatedLevel) };
      dispatch(updateSkill({ id: updatedSkill.id, skill: updatedSkill })); 
      handleClose();
    }
  };

  const handleImageClick = (image) => {
    setEditingSkill(image);
    setEditingSkill((prev) => ({ ...prev, image: "" }))
    setOpenImageModal(true);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };
  const handleUpdateImage = () => {
    if (selectedImage && editingSkill !== null) {
      const formData = new FormData();
      formData.append("image", new Blob(
        [JSON.stringify(
          editingSkill
        )],
        { type: 'application/json' }
      )
      );
      formData.append("file", selectedImage);
      dispatch(upload(formData));
      setOpenImageModal(false);
      setSelectedImage(null);
    }
  };
  return (
    <div className="skills-container">
      <div>
        {filteredSkills.length > 0 ? (
          filteredSkills.map((skill) => {
            const images = SkillImages.filter((image) => image.skill.id === skill.id);
            const skillComments = responses.filter((response) => response.skill.id === skill.id);
            console.log(images);
            const currentIndex = currentImageIndex[skill.id] || 0;
            return (
              <div key={skill.id} className="skill-tiktok-post">
                <div className="skill-container">

                  <div className="skill-gallery">
                    {images.length > 0 && (
                      <>
                        <img
                          src={`data:image/png;base64,${images[currentIndex]?.image}`}
                          alt={`Skill ${skill.name}`}
                          onClick={() => handleImageClick(images[currentIndex])}
                          className="skill-image"
                        />
                        <button
                          className="prev-image"
                          onClick={() => handlePrevImage(skill.id)}
                          disabled={currentIndex === 0}
                        >
                          &lt;
                        </button>
                        <button
                          className="next-image"
                          onClick={() => handleNextImage(skill.id, images.length)}
                          disabled={currentIndex === images.length - 1}
                        >
                          &gt;
                        </button>
                      </>
                    )}
                  </div>
                  <div className="skill-footer">
                    <div className="skill-header">
                      <Avatar
                        src={usersImages[skill.user.id]}
                        alt={user.userName.toUpperCase()}
                        className="avatar"
                      />

                      <div className="user-info">
                        <h3>{skill.user.userName}</h3>
                      </div>

                      <IconButton color="error" onClick={() => delletedSkill(skill.id, images, skillComments)}>
                        <DeleteIcon />
                      </IconButton>
                      <IconButton className="like-button">
                        ❤️ {skill.hearts}</IconButton>
                      <IconButton color="primary" onClick={() => handleClickOpen(skill)}>
                        <EditIcon />
                      </IconButton>
                    </div>

                    <span className="post-date">{new Date(skill.uploadDate).toLocaleString()}</span>

                    <div className="skill-info">
                      <p className="skill-description">{skill.category.name}</p>
                      <p className="skill-description">{skill.name}</p>
                      <p className="skill-description">{skill.description}</p>
                      <p className="skill-level">Level: {skill.level}</p>


                    </div>

                    <div className="skill-comments">
                      <h4>Comments:</h4>
                      <ul>
                        {skillComments.map((comment) => {
                          const profile = users.filter((user) => comment.user.id === user.id);
                          console.log("profile" + profile);
                          return (
                            <li key={comment.id}>
                              <div>
                                <Avatar
                                  src={`data:image/jpg;base64,${profile[0]?.image || ''}` || ''}
                                  alt={comment.user.userName?.toUpperCase()}
                                  className="avatar"
                                />
                                <strong>{comment.user.userName}:</strong> {comment.respons}
                              </div>
                              <span className="post-date">{new Date(comment.uploadDate).toLocaleString()}</span>
                            </li>)
                        })}
                      </ul></div>
                  </div></div>
              </div>
            );
          })
        ) : (
          <p>No skills available.</p>
        )}


      </div>

      {/* Modal */}
      <Dialog open={open} onClose={handleClose} PaperProps={{ style: styles.dialog }}>
        <DialogTitle style={styles.title}>update your skill</DialogTitle>
        <DialogContent>
          <TextField
            label="description"
            fullWidth
            multiline
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
            margin="normal"
            InputProps={{ style: styles.input }}
          />
          <TextField
            label="level"
            name="level"
            type="number"
            fullWidth
            InputProps={{ inputProps: { min: 1, max: 10 } }}
            sx={{ '& input': { fontSize: '1rem' } }}

            value={updatedLevel}
            onChange={(e) => setUpdatedLevel(e.target.value)}
            margin="normal"
          />

        </DialogContent>
        <DialogActions style={styles.actions}>
          <Button onClick={handleClose} style={styles.cancelButton}>
            cancel
          </Button>
          <Button onClick={handleUpdateSkill} style={styles.updateButton}>
            update
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openImageModal} onClose={() => setOpenImageModal(false)}>
        <DialogTitle>choose new photo</DialogTitle>
        <DialogContent>
          <input type="file" onChange={handleImageChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenImageModal(false)} color="secondary">cancel</Button>
          <Button onClick={handleUpdateImage} color="primary" startIcon={<CloudUploadIcon />}>update photo</Button>
        </DialogActions>
      </Dialog>
    </div>

  );
};
const styles = {
  dialog: {
    borderRadius: "12px",
    padding: "16px",
    backgroundColor: "#f5f5f5",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "1.5rem",
    color: "#333",
  },
  input: {
    backgroundColor: "#f9fafb",
    borderRadius: "8px",
    fontSize: "1rem",
    color: "#333",
    padding: "10px",
    border: "1px solid #ddd",
  },
  actions: {
    justifyContent: "center",
    padding: "8px 16px",
  },
  cancelButton: {
    color: "#777",
    fontWeight: "bold",
    textTransform: "none",
  },
  updateButton: {
    backgroundColor: "#000",
    color: "#fff",
    fontWeight: "bold",
    textTransform: "none",
    borderRadius: "8px",
    padding: "6px 16px",
  },
};

export default ShowSkillsComponent;
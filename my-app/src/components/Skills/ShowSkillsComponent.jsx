import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSkills, addHeart } from '../../features/reducers/skillSlice';
import { getImages } from '../../features/reducers/imageSlice';
import { addResponse, getResponses } from '../../features/reducers/responseSlice';
import { useParams } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import { TextField, Avatar, IconButton } from '@mui/material';
import { getUsers } from '../../features/reducers/userSlice';
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
  const { categoryId } = useParams();
  const [likedSkills, setLikedSkills] = useState({});
  const [comments, setComments] = useState([]); 
  const [currentImageIndex, setCurrentImageIndex] = useState({}); 

  useEffect(() => {
    if (skillStatus === 'idle') {
      dispatch(getSkills());
    }
    if (userStatus === 'idle') {
      dispatch(getUsers());
    }
    if (SkillImagesStatus === 'idle') {
      dispatch(getImages());
    }
    if (responsesStatus === 'idle') {
      dispatch(getResponses());
    }
  }, [dispatch, skillStatus, userStatus, SkillImagesStatus]);
  console.log(skills);
  const filteredSkills = useMemo(
    () =>
      skills.filter(
        (skill) =>
          skill.category.id === parseInt(categoryId, 10) &&
          (!user || user.id !== skill.user.id)
      ),
    [skills, categoryId, user]
  );
  const usersImages = useMemo(() => {
    const imageMap = {};
    users.forEach((user) => {
      imageMap[user.id] = `data:image/png;base64,${user.image}`;
    });
    return imageMap;
  }, [users]);
  
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
  const HandleAddHeart = async (id) => {
    if (likedSkills[id]) {
      alert('You already liked this skill!');
      return;
    }
    setLikedSkills((prev) => ({ ...prev, [id]: true }));
    dispatch(addHeart(id));

  }
  const handleAddComment = (skillId) => {

    if (comments[skillId]?.trim()) {
      const newComment = {
        user: { id: user.id },
        skill: { id: skillId },
        respons: comments[skillId].toString(),
        uploadDate: new Date().toISOString(),
      };
      console.log("hg" + newComment.respons);
      dispatch(addResponse(newComment));
      setComments((prev) => ({ ...prev, [skillId]: '' }));
    }
  };

  return (
    <div className="skills-tiktok-container">
      {filteredSkills.length > 0 ? (
        filteredSkills.map((skill) => {
          const images = SkillImages.filter((image) => image.skill.id === skill.id);
          console.log(images);
          const skillComments = responses.filter((response) => response.skill.id === skill.id);
          const currentIndex = currentImageIndex[skill.id] || 0;
          return (
            <div key={skill.id} className="skill-tiktok-post">
              <div className="skill-container">
                <div className="skill-gallery">
                  {images.length > 0 && (
                    <>
                      <img
                        src={`data:image/png;base64,${images[currentIndex].image}`}
                        alt={`Skill ${skill.name}`}
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
                      <p>{skill.user.country}</p>
                    </div>


                    <IconButton onClick={() => user ? HandleAddHeart(skill.id) : alert('עליך להתחבר קודם')} className="like-button">
                      ❤️ {skill.hearts}
                    </IconButton>
                  </div>

                  <span className="post-date">{new Date(skill.uploadDate).toLocaleString()}</span>

                  <div className="skill-info">
                    <p className="skill-description">{skill.name}</p>
                    <p className="skill-description">{skill.description}</p>
                    <p className="skill-level">Level: {skill.level}</p>
                  </div>


                  <div className="skill-comments">
                    <h4>Comments:</h4>
                    <ul>
                      {skillComments.map((comment) => {
                        const profile = users.filter((user) => comment.user.id === user.id);
                        return (
                          <li key={comment.id}>
                            <div>
                              <Avatar
                                src={`data:image/png;base64,${profile[0]?.image}`}
                                alt={skill.user.userName.charAt(0).toUpperCase()}
                                className="avatar"
                              />
                              <strong>{comment.user.userName}:</strong> {comment.respons}
                            </div>
                            <span className="post-date">{new Date(comment.uploadDate).toLocaleString()}</span>
                          </li>
                        );
                      })}
                    </ul>

                    {user && (
                      <div className="add-comment">
                        <TextField
                          placeholder="Add a comment..."
                          value={comments[skill.id] || ''}
                          onChange={(e) =>
                            setComments((prev) => ({ ...prev, [skill.id]: e.target.value }))
                          }
                          sx={{ width: '80%' }}
                        />
                        <IconButton
                          className="send-button"
                          onClick={() => handleAddComment(skill.id)}
                          sx={{
                            backgroundColor: '#1976D2',
                            color: 'white',
                            marginLeft: '8px',
                            '&:hover': { backgroundColor: '#1565C0' },
                            width: '36px',
                            height: '36px',
                            fontSize: '18px',
                            padding: '4px',
                          }}
                        >
                          <SendIcon />
                        </IconButton>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>No skills available for this category.</p>
      )}
    </div>
  );
};

export default ShowSkillsComponent;
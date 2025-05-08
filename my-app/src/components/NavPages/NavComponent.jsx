
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserDTOById } from '../../features/reducers/userSlice';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import { signout } from '../../features/reducers/userSlice';
import MenuItem from '@mui/material/MenuItem';
import './Navbar.css';

export let isUpdateImage;

const NavComponent = () => {
  const navigate = useNavigate();
  // const user = useSelector((state) => state.user.user);
  const user = JSON.parse(localStorage.getItem("user"))
  const status = useSelector((state) => state.image.status);
  const dispatch = useDispatch();
  const [image, setImage] = useState('');
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log(user);
        if (user && user.userName) {
          const base64Image = await dispatch(getUserDTOById(user.id)).unwrap();
          const dataUrl = `data:image/png;base64,${base64Image.image}`;
          setImage(dataUrl);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [user, status, dispatch]);

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const logout =  () => {
    dispatch(signout()); 
    console.log("User logged out");
    setImage('')
    navigate('/login')

  };
  isUpdateImage = async () => {
    const base64Image = await dispatch(getUserDTOById(user.id)).unwrap();
    const dataUrl = `data:image/png;base64,${base64Image.image}`;
    setImage(dataUrl);
  }

  return (

    <nav>
      <div className="nav-container">
        <div
          className="profile-section"
          onMouseEnter={toggleDropdown}
          onMouseLeave={toggleDropdown}
        >
          {image && (
            <Avatar
              src={image || './images/images.png'}
              alt={user?.userName.toUpperCase()}
              sx={{ width: 70, height: 70, margin: '10px auto' }}
            />
          )}
          {dropdownVisible && user && (
            <div className="profile-dropdown">
              <MenuItem onClick={() => navigate('/ShowYourSkills')}>your Skills</MenuItem>
              <MenuItem onClick={() => navigate('/AddSkill')}>add new Skill</MenuItem>
              <MenuItem onClick={() => navigate('/CreateProfile')}>profile</MenuItem>
              <MenuItem onClick={() => logout()}>Logout</MenuItem>
            </div>
          )}   </div>

        {!user && (
          <div className="profile-section" >
            <Link
              to="/SignUp"
              style={{
                backgroundColor: "#A1887F",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              style={{
                backgroundColor: "white",
                color: "black",
                padding: "10px 20px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Login
            </Link></div>
        )
        }

        <ul>
          <li>
            <Link className="link" to="/UserComponent">Users</Link>
          </li>

          <li>
            <Link className="link" to="/CategoryComponent">Categories</Link>
          </li>
          <li>
            <Link className="link" to="/AboutUs">About Us</Link>
          </li>

        </ul>
        <div className="logo">
          <img src="./images/Screenshot 2024-12-15 at 13.42.54.png" alt="Logo" style={{ width: "100px" }} />
        </div>
      </div>
    </nav>
  );
};

export default NavComponent;
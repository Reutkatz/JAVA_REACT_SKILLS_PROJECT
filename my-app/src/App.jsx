
import './App.css'
import UserComponent from './components/UsersPages/userComponent'
import CategoryComponent from '../src/components/categoryComponent'
import Login from './components/Login'
import SignUp from '../src/components/SignUp'
import { Routes, Route } from 'react-router-dom';
import CreateProfile from './components/CreateProfile'
import { BrowserRouter as Router } from 'react-router-dom';
import NavComponent from './components/NavPages/NavComponent'
import Home from './components/HomePages/Home'
import SkillUploader from './components/Skills/SkillUploaderComponent'
import ShowSkillsComponent from './components/Skills/ShowSkillsComponent'
import ShowYourSkills from './components/Skills/ShowYourSkills'
import ProtectedRoute from './components/ProtectedRoutes'
import AddSkill from './components/Skills/AddSkill'
import Footer from './components/Footer'
import { styled } from '@mui/system';
import { Box } from '@mui/material';
import AboutUs from './components/aboutUs'

function App() {
  const PageContainer = styled(Box)({
    minHeight: '100vh',
  });
  return (
    <>

      <Router>
        <NavComponent />
        <PageContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/UserComponent" element={<ProtectedRoute element={<UserComponent />} />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/CreateProfile" element={<CreateProfile />} />
            <Route path="/CategoryComponent" element={<ProtectedRoute element={<CategoryComponent />} />} />
            <Route path="/SkillUploaderComponent" element={<SkillUploader />} />
            <Route path="/ShowYourSkills" element={<ShowYourSkills />} />
            <Route path="/AddSkill" element={<AddSkill />} />
            <Route path="/skills/:categoryId" element={<ShowSkillsComponent />} />
          </Routes>
        </PageContainer>
        <Footer />
      </Router>
    </>
  )
}

export default App;

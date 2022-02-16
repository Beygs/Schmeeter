import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from 'app/components/Navbar';
import PostsList from 'features/posts/components/PostsList';
import RegisterForm from 'features/auth/components/RegisterForm';
import LoginForm from 'features/auth/components/LoginForm';
import { useSelector } from 'react-redux';
import { selectAuth } from 'features/auth/authSlice';
import UserProfile from 'features/users/components/UserProfile';

function App() {
  const PrivateRoute = ({ children }) => {
    const isAuth = useSelector((state) => selectAuth(state));
    return isAuth ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/profile" element={<PrivateRoute><UserProfile myprofile /></PrivateRoute>} />
          <Route path="/users/:userId" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
          <Route path="/" element={<PostsList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

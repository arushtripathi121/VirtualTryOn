import './App.css';
import LandingPage from './pages/LandingPage';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import HomePage from './pages/HomePage';
import api from './hooks/api';
import { useEffect, useState } from 'react';

const GoogleWrapper = () => {
  return (
    <GoogleOAuthProvider clientId='706482603533-jvvfn2563ap39osqdh4j129aorbinrlt.apps.googleusercontent.com'>
      <LandingPage />
    </GoogleOAuthProvider>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await api.get('/protected');
        if (res.data.success) {
          setUser(res.data.user);
          navigate('/home');
        }
      } catch (err) {
        console.log('No valid session:', err.response?.data?.message);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-white text-2xl">
        Checking session...
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<GoogleWrapper />} />
        <Route path="/home" element={<HomePage user={user} />} />
      </Routes>
    </>
  );
}

export default function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

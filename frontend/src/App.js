import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react'

// pages
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Profile from './pages/Profile';
import Contacts from './pages/Contacts';

function AppContent() {

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  });

  return(
    <div className={`app-conateiner ${ user ? 'bg-gray':''}`}> 
        <Routes>
            {/* Route racine */}
            <Route 
              path="/" 
              element={user ? <Navigate to="/profile" replace /> : <Navigate to="/login" replace />} 
            />

            {/* Routes publiques */}
            <Route 
              path="/login" 
              element={!user ? <LoginPage user={user} setUser={setUser} /> : <Navigate to="/profile" replace />} 
            />
            <Route 
              path="/register" 
              element={!user ? <RegisterPage user={user} setUser={setUser} /> : <Navigate to="/profile" replace />} 
            />
            
            {/* Route privée */}
            <Route 
              path="/profile" 
              element={user ? <Profile user={user} setUser={setUser} /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/contacts" 
              element={user ? <Contacts user={user} setUser={setUser} /> : <Navigate to="/login" replace />} 
            />
        </Routes>
    </div>
  )
}


function App() {
  return (
    <Router>
        <AppContent />
    </Router>
  );
}

export default App;

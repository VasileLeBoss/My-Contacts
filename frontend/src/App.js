import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react'

// pages
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';

function AppContent() {

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  });

  return(
    <div className='app-conateiner'> 
        <Routes>
            <Route path="/" 
              element={ 
                !user 
                  ? <Navigate to="/dashboard" replace /> 
                  : <Navigate to="/login" replace /> 
              }  
            />
            <Route path='/register' element={<RegisterPage user={user} setUser={setUser} />}/>
            <Route path='/login' element={<LoginPage user={user} setUser={setUser} />}/>
            <Route path='/dashboard' element={<Dashboard user={user} setUser={setUser} />} />
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

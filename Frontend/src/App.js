import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from './rtk/slices/credentials-slice';

import NavBar from './components/NavBar';
import EventSections from './components/EventSections';
import Login from './components/Login';
import Footer from './components/Footer';
import Register from './components/Register';
import EventDetails from './components/EventDetails';
import EventsDashboard from './components/EventsDashboard';
import RoleManagement from './components/RoleManagement';
import ProtectedRoute from './components/ProtectedRoute'; 
import CreateEventPage from './components/Create-event-page';
import EditEventPage from './components/Edit-event-page';

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = parseJwt(token);
      dispatch(setCredentials({ token, user }));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <NavBar />
      <div style={{ minHeight: '100vh', userSelect: 'none' }}>
        <Routes>
          <Route path="/" element={<EventSections />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/eventDetails" element={<EventDetails />} />
          <Route
            path="/eventsDashboard"
            element={
              <ProtectedRoute roleRequired="Admin">
                <EventsDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editEventPage"
            element={
              <ProtectedRoute roleRequired="Admin">
                <EditEventPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/creatEventPage"
            element={
              <ProtectedRoute roleRequired="Admin">
                <CreateEventPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/roleManagement"
            element={
              <ProtectedRoute roleRequired="Admin">
                <RoleManagement />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar'
import EventSections from './components/EventSections'
import Login from './components/Login';
import Footer from './components/Footer'
import Register from './components/Register';
import EventDetails from './components/EventDetails';
import EventsDashboard from './components/EventsDashboard'
import EditCreateEventPage from './components/Edit-Create-event-page'
import RoleManagement from './components/RoleManagement';
function App() {
  return (
    <BrowserRouter>
      <NavBar />
        <div style={{minHeight:'100vh',userSelect:'none'}}>
          <Routes>
            <Route path="/"  element={<EventSections />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>}/>
            <Route path="/eventDetails" element={<EventDetails/>}/>
            <Route path="/eventsDashboard" element={<EventsDashboard/>}/>
            <Route path='editCreateEventPage' element ={<EditCreateEventPage/>}/>
            <Route path='roleManagement' element = {<RoleManagement/>}/>
          </Routes>
        </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

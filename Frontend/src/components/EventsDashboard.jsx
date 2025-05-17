import React, { useEffect } from 'react';
import './EventsDashboard.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents, deleteEvent } from '../rtk/slices/event-slice';

function EventsDashboard() {
  const { events } = useSelector((state) => state.events);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); 

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleEdit = (event) => {
    navigate('/editEventPage', { state: { data: event } });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      dispatch(deleteEvent({ id, token }));
    }
  };

  return (
    <div className='dashboard-container'>
      <h2>Admin Dashboard</h2>
      <div className='create_event'>
        <Link className='add_Role_btn' to="/roleManagement">Add Role</Link>
        <Link className='create_event_btn' to="/creatEventPage">Create Event</Link>
      </div>
      <table className="events-table">
        <thead>
          <tr className='table-header'>
            <th>Event</th>
            <th>Date & Time</th>
            <th>Venue</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id} className='event-row'>
              <td>
                <div className='event-info'>
                  <img className='event-row-img' src={event.imgUrl}  />
                  
                  <div className='name-category-container'>
                    <h5 className='event-name'>{event.eventName}</h5>
                    <p className='event-category'>{event.category}</p>
                  </div>
                </div>
              </td>
              <td>{new Date(event.date).toLocaleString()}</td>
              <td>{event.venue}</td>
              <td>{event.price} $</td>
              <td>
                <div className='action-buttons'>
                  <button onClick={() => handleEdit(event)} className='button-edit'>Edit</button>
                  <button onClick={() => handleDelete(event.id)} className='button-delete'>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EventsDashboard;

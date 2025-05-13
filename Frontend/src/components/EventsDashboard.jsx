import React from 'react';
import './EventsDashboard.css';
import { Link } from 'react-router-dom';
function EventsDashboard() {
  return (
    <div className='dashboard-container' >
      <h2 >Admin Dashboard</h2>
      <div className='create_event'>
        <Link className='add_Role_btn' to ="/roleManagement">
          Add Role
        </Link>
        <Link className='create_event_btn' to={"/editCreateEventPage"}>
          Create Event
        </Link>

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
          <tr className='event-row'>
            <div className='event-info'>
              <td><img className='event-row-img' src="https://dynamic-media.tacdn.com/media/photo-o/2e/a4/09/6e/caption.jpg?w=1100&h=800&s=1" alt="" /></td>

              <div className='name-category-container'>
                <h5 className='event-name'>Event Name</h5>
                <p className='event-category'>Category</p>
              </div>
            </div>
            <td>2023-10-01 18:00</td>
            <td>Venue</td>
            <td>$20.00</td>
            <td>
              <div className='action-buttons'>
                <Link  to={"/editCreateEventPage"}>
                  <button className='button-edit'>Edit</button>
                </Link>
                <button className='button-delete' >Delete</button>
              </div>
            </td>
          </tr>
          <tr className='event-row'>
            <div className='event-info'>
              <td><img className='event-row-img' src="https://dynamic-media.tacdn.com/media/photo-o/2e/a4/09/6e/caption.jpg?w=1100&h=800&s=1" alt="" /></td>

              <div className='name-category-container'>
                <h5 className='event-name'>Event Name</h5>
                <p className='event-category'>Category</p>
              </div>
            </div>
            <td>2023-10-01 18:00</td>
            <td>Venue</td>
            <td>$20.00</td>
            <td>
              <div className='action-buttons'>
                <Link  to={"/editCreateEventPage"}>
                  <button className='button-edit'>Edit</button>
                </Link>
                <button className='button-delete' >Delete</button>
              </div>
            </td>
          </tr>
          <tr className='event-row'>
            <div className='event-info'>
              <td><img className='event-row-img' src="https://dynamic-media.tacdn.com/media/photo-o/2e/a4/09/6e/caption.jpg?w=1100&h=800&s=1" alt="" /></td>

              <div className='name-category-container'>
                <h5 className='event-name'>Event Name</h5>
                <p className='event-category'>Category</p>
              </div>
            </div>
            <td>2023-10-01 18:00</td>
            <td>Venue</td>
            <td>$20.00</td>
            <td>
              <div className='action-buttons'>
                <Link  to={"/editCreateEventPage"}>
                  <button className='button-edit'>Edit</button>
                </Link>
                <button className='button-delete' >Delete</button>
              </div>
            </td>
          </tr>
        
        </tbody>
      </table>
    </div>
  );
}

export default EventsDashboard;
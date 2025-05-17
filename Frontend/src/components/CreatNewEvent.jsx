import React, { useState, useEffect } from 'react';
import './CreatNewEvent.css';
import { useDispatch } from 'react-redux';
import { createEvent, updateEvent } from '../rtk/slices/event-slice';
import { useNavigate } from 'react-router-dom';

function CreatNewEvent({ eventData }) {
  const [formData, setFormData] = useState({
    id: null,
    eventName: '',
    category: '',
    description: '',
    venue: '',
    dateTime: '',
    price: '',
    imgUrl: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (eventData) {
      setFormData({
        id: eventData.id,
        eventName: eventData.eventName || '',
        category: eventData.category || '',
        description: eventData.description || '',
        venue: eventData.venue || '',
        dateTime: eventData.date ? new Date(eventData.date).toISOString().slice(0, 16) : '',
        price: eventData.price || '',
        imgUrl: eventData.imgUrl || '',
      });
    }
  }, [eventData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      date: formData.dateTime,
      price: parseFloat(formData.price),
    };

    if (eventData) {
      dispatch(updateEvent({ eventData: payload, token }));
    } else {
      dispatch(createEvent({ eventData: payload, token }));
    }

    navigate('/eventsDashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="create-new-event">
      <h3>{eventData ? 'Edit Event' : 'Create New Event'}</h3>

      <div className="first-row">
        <div className="event-element">
          <label htmlFor="eventName">Event Name*</label>
          <input type="text" id="eventName" name="eventName" required value={formData.eventName} onChange={handleChange} />
        </div>

        <div className="event-element">
          <label htmlFor="category">Event Category*</label>
          <select id="category" name="category" required value={formData.category} onChange={handleChange}>
            <option value="">Select category</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Business">Business</option>
            <option value="Sport">Sport</option>
            <option value="Music">Music</option>
            <option value="Food">Food</option>
            <option value="Art">Art</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="second-row">
        <div className="event-element-textarea">
          <label htmlFor="description">Description*</label>
          <textarea id="description" name="description" required value={formData.description} onChange={handleChange}></textarea>
        </div>
      </div>

      <div className="third-row">
        <div className="event-element">
          <label htmlFor="venue">Venue*</label>
          <input type="text" id="venue" name="venue" required value={formData.venue} onChange={handleChange} />
        </div>

        <div className="event-element">
          <label htmlFor="dateTime">Event Date & Time*</label>
          <input type="datetime-local" id="dateTime" name="dateTime" required value={formData.dateTime} onChange={handleChange} />
        </div>
      </div>

      <div className="fourth-row">
        <div className="event-element">
          <label htmlFor="price">Price*</label>
          <input type="number" id="price" name="price" required value={formData.price} onChange={handleChange} />
        </div>

        <div className="event-element">
          <label htmlFor="imgUrl">Image URL*</label>
          <input type="url" id="imgUrl" name="imgUrl" required value={formData.imgUrl} onChange={handleChange} />
        </div>
      </div>

      <div className="fifth-row">
        <button type="button" className="cancel-btn" onClick={() => navigate('/eventsDashboard')}>Cancel</button>
        <button type="submit" className="create-event-btn">{eventData ? 'Update Event' : 'Create Event'}</button>
      </div>
    </form>
  );
}

export default CreatNewEvent;

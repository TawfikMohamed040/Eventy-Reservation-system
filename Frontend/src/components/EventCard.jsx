import React, { useEffect, useState } from 'react';
import './EventCard.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserReservations } from '../rtk/slices/reservation-slice';

function EventCard(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { reservations } = useSelector((state) => state.reservation);

  const [booked, setBooked] = useState(false);

  const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    } catch (error) {
      console.error("Token decode error:", error);
      return null;
    }
  };

  const userId = getUserIdFromToken();

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserReservations(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (reservations && userId && props.id) {
      const alreadyReserved = reservations.some(
        (res) => res.eventId === props.id && res.userId === userId
      );
      setBooked(alreadyReserved);
    }
  }, [reservations, userId, props.id]);

  const handleNavigation = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/eventDetails', { state: { event: props } });
    } else {
      alert('You must be logged in to view event details.');
      navigate('/login');
    }
  };

  return (
    <div className="event-card" id={props.id}>
      <div onClick={handleNavigation} style={{ cursor: 'pointer' }}>
        <img className="event-img" src={props.imgPath}  />
      </div>
      <div className="event-card-header">
        <p className='category'>{props.category}</p>
        <p>{new Date(props.date).toLocaleString()}</p>
      </div>
      <div className="event-card-body">
        <h2>{props.title}</h2>
        <p className="description">{props.description}</p>
      </div>
      <div className="event-card-footer">
        <p>{props.price}$</p>
        <button
          onClick={handleNavigation}
          style={{
            backgroundColor: booked ? 'green' : '#1abc9c',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'background-color 0.3s ease'
          }}
        >
          {booked ? '✔ Booked' : 'Book now'}
        </button>
      </div>
    </div>
  );
}

export default EventCard;

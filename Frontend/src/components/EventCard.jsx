import React from 'react';
import './EventCard.css';
import { Link } from 'react-router-dom';
import EventDetails from './EventDetails';
function EventCard(props) {
  return (
    <div className="event-card">
      <Link  to='/eventDetails'>
        <img 
          className="event-img" 
          src={props.imgPath }
        />
      </Link>
      <div className="event-card-header">
        <p className='category'>{props.category}</p>
        <p>{props.date}</p>
      </div>
      <div className="event-card-body">
        <h2>{props.title}</h2>
        <p className="description">
          {props.description}
        </p>
      </div>
      <div className="event-card-footer">
        <p>{props.price}$</p>
        <Link to='/eventDetails'>
          <button>Book now</button>
        </Link>
      </div>
    </div>
  );
}

export default EventCard;
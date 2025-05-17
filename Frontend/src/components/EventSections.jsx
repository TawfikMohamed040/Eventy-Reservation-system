import React, { useEffect } from 'react';
import './EventSections.css';
import EventCard from './EventCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../rtk/slices/event-slice';

function EventSections() {
  const events = useSelector((state) => state.events.events || []);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]); 

  return (
    <div className="event-sections">
      {events.map((event) => (
       <EventCard key={event.id}
          id={event.id}
          title={event.eventName}
          description={event.description}
          price={event.price}
          imgPath={event.imgUrl}
          category={event.category}
          date={event.date}
          venue={event.venue}
        />
      ))}
    </div>
  );
}

export default EventSections;

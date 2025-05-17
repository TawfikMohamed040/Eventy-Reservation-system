import React from 'react';
import CreatNewEvent from './CreatNewEvent';
import { useLocation } from 'react-router-dom';

function CreateEventPage() {
  const location = useLocation();
  const eventData = location.state?.data;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
      <h1>Create Event Page</h1>
      <CreatNewEvent eventData={eventData} />
    </div>
  );
}

export default CreateEventPage;

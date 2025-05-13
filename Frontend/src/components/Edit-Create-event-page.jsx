import React from 'react';
import CreatNewEvent  from './CreatNewEvent'; // Assuming you have a CreateEvent component

function EditCreateEventPage() {
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'100vh'}}>
      <h1>Edit/Create Event Page</h1>
      <CreatNewEvent />
    </div>
  );
}

export default EditCreateEventPage;
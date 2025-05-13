import React from 'react';
import './EventDetails.css'; // Import your CSS file

function EventDetails() {
    return (
        <div className="event-details">
            <div className="event-image">
                <img src="https://meetings.skift.com/wp-content/uploads/2024/08/corporate-event-lights-and-entertainment-1024x574.jpeg" />
            </div>
            <div  style={{width:'80%', margin:'auto', display:'flex', justifyContent:'space-between'}}>
                <div className="event-card-left">
                    <h6 className='catagory'>Catagory</h6>
                    <h2 className="event-title" style={{margin :'0px' }}>Event Title</h2>
                    <p>Tuesday, July 15, 2025</p>
                    <p>Time: 12:00 PM</p>
                    <p>venue</p>
                    <div className='event-description'>
                        <h5>Description</h5>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.</p>
                    </div>
                </div>
                <div className="event-card-Book">
                    <h3>Event Details</h3>
                    <p>Price :<h5>50.00$</h5> </p>
                    <p>Date: <h5>Tuesday, July 15, 2025 </h5> </p>
                    <p>Location: <h5>Giza</h5></p>
                    <button>Book Now</button>
                </div>    
            </div>
        </div>
    );
}
export default EventDetails; 
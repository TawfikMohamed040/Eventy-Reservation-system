import React from 'react';
import './CreatNewEvent.css';
function CreatNewEvent() {
    return (
        <div className="create-new-event">
            <h3>Create New Event</h3>
            <div  className="first-row">
                <div className="event-element">
                    <label htmlFor="">Event Name*</label>
                    <input type="text" name="" id="" required/>
                </div>
                <div className="event-element">
                    <label htmlFor="">Event Category*</label>
                    <select name="" id="" required>
                        <option value="">Entertainment</option>
                        <option value="">Business</option>
                        <option value="">Sport</option>
                        <option value="">Music</option>
                        <option value="">Food</option>
                        <option value="">Art</option>
                        <option value="">Other</option>
                    </select>
                </div>
            </div>

            <div className='second-row'>
                <div className='event-element-textarea'>
                    <label htmlFor="">Description*</label>
                    <textarea name="" id="" cols="30" rows="10" required></textarea>
                </div>
            </div>
            
            <div className="third-row">
                <div className='event-element'>
                    <label htmlFor="">Venue*</label>
                    <input type="text" name="" id="" required/>
                </div>
                <div className='event-element'>
                    <label htmlFor="">Event Date & Time*</label>
                    <input type="date" name="" id="" required/>
                </div>
            </div>
            <div className="fourth-row">
                <div className='event-element'>
                    <label htmlFor="">Price*</label>
                    <input type="number" name="" id="" required/>
                </div>
                <div className='event-element'>
                    <label htmlFor="">Image URL*</label>
                    <input type="url" name="" id="" required/>
                </div>
            </div>
            <div className="fifth-row">
                <button className='cancel-btn'>Cancel</button>
                <button className='create-event-btn'>Create Event</button>
            </div>
        </div>

    );
}
export default CreatNewEvent;
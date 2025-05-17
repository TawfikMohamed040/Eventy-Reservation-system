import './EventDetails.css';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserReservations, createReservation } from '../rtk/slices/reservation-slice';

// Get user ID from token
const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const base64Payload = token.split('.')[1];
        const payload = JSON.parse(atob(base64Payload));
        return payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};

function EventDetails() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const event = location.state?.event;
    const userId = getUserIdFromToken();

    const { reservations } = useSelector((state) => state.reservation);

    const [booked, setBooked] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        if (!event) {
            navigate('/');
        }
    }, [event, navigate]);

    useEffect(() => {
        if (userId) {
            dispatch(fetchUserReservations(userId));
        }
    }, [userId, dispatch]);

    useEffect(() => {
        if (reservations && event && userId) {
            const alreadyReserved = reservations.some(
                (res) => res.eventId === event.id && res.userId === userId
            );
            setBooked(alreadyReserved);
        }
    }, [reservations, event, userId]);

    const handleBookNow = () => {
        const reservationDto = {
            eventId: event.id,
            userId: userId
        };

        dispatch(createReservation(reservationDto)).then((res) => {
            if (res.meta.requestStatus === 'fulfilled') {
                setBooked(true);
                setShowMessage(true);
                setTimeout(() => setShowMessage(false), 3000);
            }
        });
    };

    if (!event) return <p>No event data to provide.</p>;

    return (
        <div className="event-details" id={event.id}>
            <div className="event-image">
                <img src={event.imgPath} alt="Event" />
            </div>
            <div style={{ width: '80%', margin: 'auto', display: 'flex', justifyContent: 'space-between' }}>
                <div className="event-card-left">
                    <h6 className='catagory'>{event.category}</h6>
                    <h2 className="event-title" style={{ margin: '0px' }}>{event.title}</h2>
                    <p>{new Date(event.date).toLocaleDateString()}</p>
                    <p>{new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    <p>{event.venue || 'Giza'}</p>
                    <div className='event-description'>
                        <h5>Description</h5>
                        <p>{event.description}</p>
                    </div>
                </div>
                <div className="event-card-Book">
                    <h3>Event Details</h3>
                    <p>Price: <h5>{event.price}$</h5></p>
                    <p>Date: <h5>{new Date(event.date).toLocaleString()}</h5></p>
                    <p>Location: <h5>{event.venue || 'Giza'}</h5></p>

                    <button
                        onClick={handleBookNow}
                        style={{
                            backgroundColor: booked ? 'green' : '#1abc9c',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: booked ? 'default' : 'pointer',
                            fontWeight: '600',
                            transition: 'background-color 0.3s ease, transform 0.2s ease'
                        }}
                        disabled={booked}
                    >
                        {booked ? 'Booked' : 'Book Now'}
                    </button>

                    {showMessage && (
                        <p style={{ color: 'green', marginTop: '10px' }}>
                            Booked successfully!
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EventDetails;

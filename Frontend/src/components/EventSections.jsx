import React from 'react';
import './EventSections.css'; // Import your CSS file
import EventCard from './EventCard'; // Import the EventCard component

function EventSections() {
  return (
    <div className="event-sections">
      <EventCard
        title="Tech Conference 2025"
        description="Join industry leaders to discuss the future of technology."
        price={150}
        imgPath="https://images.unsplash.com/photo-1551836022-d5d88e9218df"
        category="Technology"
      />

      <EventCard
        title="Photography Workshop"
        description="Master the art of photography with hands-on sessions."
        price={75}
        imgPath="https://images.unsplash.com/photo-1491975749810-6f4e4e31c468"
        category="Art & Design"
      />

      <EventCard
        title="Startup Pitch Night"
        description="Watch early-stage startups pitch their ideas to investors."
        price={25}
        imgPath="https://images.unsplash.com/photo-1551836022-3b6f8683605f"
        category="Business"
      />

      <EventCard
        title="Live Jazz Night"
        description="Enjoy a night of smooth jazz by the river."
        price={50}
        imgPath="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4"
        category="Music"
      />

      <EventCard
        title="AI Bootcamp"
        description="Learn how to build AI models with expert instructors."
        price={200}
        imgPath="https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
        category="Education"
      />

      <EventCard
        title="Cooking Masterclass"
        description="Cook alongside a Michelin-starred chef and learn secret techniques."
        price={120}
        imgPath="https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38"
        category="Food & Drink"
      />
    </div>
  );
}

export default EventSections;

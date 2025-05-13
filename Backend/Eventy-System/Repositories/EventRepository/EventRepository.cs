using Eventy_System.DTOs;
using Eventy_System.Models;
using Microsoft.EntityFrameworkCore;

namespace Eventy_System.Repositories.Event;
using Eventy_System.Models; 
public class EventRepository :IEventRepository
{
    private readonly EventContext _context;
    public EventRepository(EventContext context)
    {
        _context = context;
    }
    public async Task<IEnumerable<Event>> GetAllAsync()
    {
        return await _context.Events.ToListAsync();
    }

    public async Task<Event> GetById(int id)
    {
        return await _context.Events.FindAsync(id);
    }

    public async Task<Event> Create(EventDTO eventItem)
    {
        var eventObj = new Models.Event
        {
            EventName = eventItem.EventName,
            Description = eventItem.Description,
            Date = eventItem.Date,
            Venue = eventItem.Venue,
            ImgUrl = eventItem.ImgUrl,
            Category = eventItem.Category,
            Price = eventItem.Price
        };

        await _context.Events.AddAsync(eventObj);
        return eventObj; 
    }
    
    public async Task<Event> Update(Event eventItem)
    {
         _context.Events.Update(eventItem);
         return eventItem;
    }

    public async Task<bool> Delete(int id)
    {
        var eventItem = await _context.Events.FindAsync(id);
        if (eventItem == null)  
            return false;
        
        _context.Events.Remove(eventItem);
        return true;
    }

    public void Save()
    {
        _context.SaveChanges();
    }
}
using Eventy_System.DTOs;
using Eventy_System.Models;
using Eventy_System.Repositories.Event;

namespace Eventy_System.Services.EventService;

public class EventService :IEventService
{
    private IEventRepository _context;

    public EventService(IEventRepository context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Event>> GetAllAsync()
    {
        return await _context.GetAllAsync();
    }

    public async Task<Event> GetById(int id)
    {
            return await _context.GetById(id);
    }

    public async Task<Event> Create(EventDTO eventItem)
    {
        return await _context.Create(eventItem);
    }

    public async Task<Event> Update(Event eventItem)
    {
        var eventObj = await _context.GetById(eventItem.Id);
        if (eventObj == null)  
            return null;
        eventObj.EventName = eventItem.EventName;
        eventObj.Description = eventItem.Description;
        eventObj.Date = eventItem.Date;
        eventObj.Venue = eventItem.Venue;
        eventObj.ImgUrl = eventItem.ImgUrl;
        eventObj.Category = eventItem.Category;
        eventObj.Price = eventItem.Price;
        return eventObj;
    }

    public async Task<bool> Delete(int id)
    {
        return await _context.Delete(id);
    }

    public void Save()
    {
        _context.Save();
    }
}
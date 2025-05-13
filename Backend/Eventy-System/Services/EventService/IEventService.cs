using Eventy_System.DTOs;
using Eventy_System.Models;

namespace Eventy_System.Services.EventService;

public interface IEventService 
{
    Task<IEnumerable<Event>>GetAllAsync();
    Task<Event> GetById(int id);
    
    Task<Event> Create(EventDTO eventItem);
    Task<Event> Update(Event eventItem);
    Task<bool> Delete(int id);
    
    void Save();
}
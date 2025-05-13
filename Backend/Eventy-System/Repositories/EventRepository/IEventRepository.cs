using Eventy_System.DTOs;

namespace Eventy_System.Repositories.Event;

using Eventy_System.Models;

public interface IEventRepository
{
    Task<IEnumerable<Event>> GetAllAsync();
    Task<Event> GetById(int id);
    Task<Event> Create(EventDTO eventItem);
    Task<Event> Update(Event eventItem);
    Task<bool> Delete(int id);
    void Save();
}
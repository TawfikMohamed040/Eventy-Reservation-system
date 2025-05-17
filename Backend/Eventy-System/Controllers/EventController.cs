using Eventy_System.DTOs;
using Eventy_System.Models;
using Eventy_System.Services.EventService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Eventy_System.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventController : ControllerBase
    {
        private  readonly  IEventService  _eventService;
        public EventController(IEventService eventService)
        {
            this._eventService = eventService;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Event>>>  GetAllEvents()
        {
            return  Ok( await _eventService.GetAllAsync());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Event>> GetEventById(int id)
        {
            var eventItem = await _eventService.GetById(id);
            if (eventItem == null)
                return NotFound();
            return Ok(eventItem);
        }
        [HttpPost]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
        public async Task<ActionResult<Event>> CreateEvent(EventDTO eventItem)
        {
            var  eventObj = await _eventService.Create(eventItem);
            _eventService.Save();
            return CreatedAtAction(nameof(GetEventById), new { id = eventObj.Id }, eventObj);
        }

        [HttpPut]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
        public async Task<ActionResult<Event>> UpdateEvent(  UpdataEventDTO updateEventDto)
        {
             var  updatedEvent = await _eventService.Update(updateEventDto);
             if (updatedEvent == null)
                 return NotFound();
             _eventService.Save();
             return Ok(updatedEvent);
        }
        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
        public async Task<IActionResult> DeleteEvent(int id)
        {
             var res = await _eventService.Delete(id);
             if (!res)
                 return NotFound();
             _eventService.Save();
             return NoContent();
        }
    }
}
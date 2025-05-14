using Eventy_System.DTOs;
using Eventy_System.Models;
using Eventy_System.Repositories.Reservation;
using Eventy_System.Services.Reservation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Eventy_System.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin,User")]
    public class ReservationController : ControllerBase
    {
        private readonly IReservationService _reservationService;

        public ReservationController(IReservationService reservationService)
        {
            _reservationService = reservationService;
        }
        
        [HttpGet("{userId}")]
        public async  Task<ActionResult<IEnumerable<ReservationDTO>>>GetUserReservations(string userId)
        {
            var result = _reservationService.GetAllReservations(userId);
            List<ReservationDTO> reservations = new List<ReservationDTO>();
            foreach (var reservation in _reservationService.GetAllReservations(userId))
            {
                 reservations.Add(new ReservationDTO()
                 {
                     EventId = reservation.EventId,
                     UserId = userId
                 });
            }
            
            return Ok(reservations);
        }
        [HttpPost]
        public async Task<IActionResult> CreateReservation(ReservationDTO reservationDto)
        {
             var result= await _reservationService.CreateReservationAsync(reservationDto);
            if (result is null)
                return  BadRequest();
            _reservationService.SaveAsync();
            return Ok(new
            {
                message = "Reservation created successfully",
                reservation = reservationDto
            });

        }
    }
}


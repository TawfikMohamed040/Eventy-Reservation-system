using Eventy_System.DTOs;
using Eventy_System.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Eventy_System.Repositories.Reservation;

public class ReservationRepository : IReservationRepository
{
    private readonly EventContext _context;
    private readonly UserManager<ApplicationUser> _userManager;

    public ReservationRepository(EventContext context, UserManager<ApplicationUser> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    public IEnumerable<Models.Reservation> GetAllReservations(string userId)
    {
        return _context.Reservations.Where(u => u.UserId == userId).ToList();
    }

    public async Task<Models.Reservation> CreateReservationAsync(ReservationDTO reservationDto)
    {
        var user = await _userManager.FindByIdAsync(reservationDto.UserId);
        var eventObj = await _context.Events.FirstOrDefaultAsync(e => e.Id == reservationDto.EventId);

        var reservation = new Models.Reservation
        {
            User = user,
            Event = eventObj,
            UserId = user.Id,
            EventId = eventObj.Id
        };

        await _context.Reservations.AddAsync(reservation);
        return reservation;
    }

    public async Task SaveAsync() // ✅ FIXED: Changed from async void
    {
        await _context.SaveChangesAsync();
    }
}
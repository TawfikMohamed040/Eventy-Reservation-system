using System.Formats.Tar;
using Eventy_System.DTOs;

namespace Eventy_System.Repositories.Reservation;
using Eventy_System.Models;
public interface IReservationRepository
{
    public IEnumerable<Reservation> GetAllReservations( string userId);
    public Task<Reservation> CreateReservationAsync(ReservationDTO reservationDto);

    public void SaveAsync();
}
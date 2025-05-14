using Eventy_System.DTOs;

namespace Eventy_System.Services.Reservation;

public interface IReservationService
{
    public IEnumerable<Models.Reservation> GetAllReservations( string useId);
    public Task<Models.Reservation> CreateReservationAsync(ReservationDTO reservationDto);
    public void SaveAsync();
}
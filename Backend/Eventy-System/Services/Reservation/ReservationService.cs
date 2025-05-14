using Eventy_System.DTOs;
using Eventy_System.Repositories.Reservation;

namespace Eventy_System.Services.Reservation;

public class ReservationService : IReservationService
{
    private IReservationRepository _reservationRepository;

    public ReservationService(IReservationRepository reservationRepository)
    {
        _reservationRepository = reservationRepository;
    }
    public IEnumerable<Models.Reservation> GetAllReservations(string useId)
    {
        return _reservationRepository.GetAllReservations(useId);
    }

    public async Task<Models.Reservation> CreateReservationAsync(ReservationDTO reservationDto)
    {
        return await _reservationRepository.CreateReservationAsync(reservationDto);
    }

    public void SaveAsync()
    {
        _reservationRepository.SaveAsync();
    }
}
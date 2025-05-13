using Microsoft.AspNetCore.Identity;

namespace Eventy_System.Models;

public class ApplicationUser :IdentityUser
{
    ICollection<Reservation> Reservations { get; set; } 
}
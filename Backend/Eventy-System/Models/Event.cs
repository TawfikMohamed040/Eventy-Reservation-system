namespace Eventy_System.Models;

public class Event
{
    public int Id { get; set; }
    public string EventName { get; set; }
    public string Description { get; set; }
    public DateTime Date { get; set; }
    public string Venue { get; set; }
    public string ImgUrl { get; set; }
    public string Category { get; set; }
    public double Price { get; set; }
    
    public ICollection<Reservation> Reservations { get; set; }
}
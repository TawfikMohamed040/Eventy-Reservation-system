using Microsoft.EntityFrameworkCore;

namespace Eventy_System.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

public class EventContext : IdentityDbContext<ApplicationUser>
{
    public DbSet<Event> Events { get; set; }
    public DbSet<Reservation> Reservations { get; set; }
    public EventContext(DbContextOptions<EventContext> options) : base(options)
    {
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Event>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.Property(e => e.EventName)
                .IsRequired()
                .HasMaxLength(100);

            entity.Property(e => e.Date)
                .HasColumnType("timestamp");

            entity.Property(e => e.Venue)
                .IsRequired();

            entity.Property(e => e.ImgUrl)
                .IsRequired();

            entity.Property(e => e.Category)
                .IsRequired()
                .HasMaxLength(50);

            entity.Property(e => e.Price)
                .IsRequired();
        });

        // Reservation -> Event many-to-one
        modelBuilder.Entity<Reservation>()
            .HasOne(r => r.Event)
            .WithMany() 
            .HasForeignKey(r => r.EventId)
            .OnDelete(DeleteBehavior.Cascade); 

        // Reservation -> ApplicationUser many-to-one
        modelBuilder.Entity<Reservation>()
            .HasOne(r => r.User)
            .WithMany() 
            .HasForeignKey(r => r.UserId)
            .OnDelete(DeleteBehavior.Restrict); 
    }
}
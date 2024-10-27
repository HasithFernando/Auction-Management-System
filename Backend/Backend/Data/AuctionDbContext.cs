using Microsoft.EntityFrameworkCore;
using Backend.Models;

public class AuctionDbContext : DbContext
{
    public DbSet<Bid> Bids { get; set; }
    public DbSet<Auction> Auctions { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Notification> Notifications { get; set; }

    public AuctionDbContext(DbContextOptions<AuctionDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>().HasData(
            new User
            {
                UserID = 1,
                Username = "Admin",
                Email = "admin@example.com",
                PasswordHash = "$2a$11$Lyg3t.HXsZM7XuQYZdcyc.I88D.5HSqWBdKmxDEsNEVwbInT5JPBe",
                Role = "Admin",
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            }
        );

        modelBuilder.Entity<Auction>(entity =>
        {
            entity.HasKey(e => e.AuctionID);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(255);
            entity.Property(e => e.Description).IsRequired();
            entity.Property(e => e.ImageURL).HasMaxLength(255);
        });
    }
}




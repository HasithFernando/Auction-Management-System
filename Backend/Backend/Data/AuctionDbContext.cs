using Microsoft.EntityFrameworkCore;
using Backend.Models;

public class AuctionDbContext : DbContext
{
    public DbSet<Bid> Bids { get; set; }
    public DbSet<Auction> Auctions { get; set; }
    public DbSet<User> Users { get; set; }

    public AuctionDbContext(DbContextOptions<AuctionDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Auction>(entity =>
        {
            entity.HasKey(e => e.AuctionID);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(255);
            entity.Property(e => e.Description).IsRequired();
            entity.Property(e => e.ImageURL).HasMaxLength(255);
        });
    }
}




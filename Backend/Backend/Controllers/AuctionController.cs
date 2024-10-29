using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;
using Backend.DTOs;
using Backend.Models;
using System.Linq;
using Backend.Services;

namespace Backend.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class AuctionController : ControllerBase
	{
        private readonly INotificationService _notificationService;
        private readonly AuctionDbContext _context;

		public AuctionController(INotificationService notificationService, AuctionDbContext context)
		{
            _notificationService = notificationService;
            _context = context;
		}

        // POST: api/auction
        [HttpPost]
        public async Task<ActionResult<Auction>> PostAuction(Auction auction)
        {
            if (auction == null)
            {
                return BadRequest("Invalid auction data.");
            }

            // Get the SellerID from the authenticated user's claims
            var sellerIdClaim = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "UserID");
            if (sellerIdClaim == null)
            {
                return Unauthorized("Seller ID not found.");
            }

            auction.SellerID = int.Parse(sellerIdClaim.Value);  // Assign the SellerID
            auction.CreatedAt = DateTime.UtcNow;
            auction.UpdatedAt = DateTime.UtcNow;

            _context.Auctions.Add(auction);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAuction), new { id = auction.AuctionID }, auction);
        }


        // GET: api/auction
        [HttpGet]
		public async Task<ActionResult<IEnumerable<Auction>>> GetAuctions()
		{
			return await _context.Auctions.ToListAsync();
		}

		// GET: api/auction/{id}
		[HttpGet("{id}")]
		public async Task<ActionResult<Auction>> GetAuction(int id)
		{
            var auction = await _context.Auctions
       .Where(a => a.AuctionID == id)
       .Select(a => new
       {
           Auction = a,
           HighestCurrentBid = _context.Bids
               .Where(b => b.AuctionID == a.AuctionID)
               .OrderByDescending(b => b.BidAmount)
               .Select(b => b.BidAmount)
               .FirstOrDefault() // Get the highest current bid
       })
       .FirstOrDefaultAsync();

            if (auction == null)
            {
                return NotFound();
            }

            return Ok(new
            {
                Auction = auction.Auction,
                HighestCurrentBid = auction.HighestCurrentBid
            });
        }

        [HttpPost("{auctionId}/place")]
        public async Task<IActionResult> PlaceBid(int auctionId, [FromBody] BidDto bidDto)
        {
            try
            {
                // Get the auction from the database
                var auction = await _context.Auctions.FindAsync(auctionId);
                if (auction == null)
                {
                    return NotFound("Auction not found.");
                }

                // Get the current highest bid for the auction (if any)
                var highestBid = await _context.Bids
                    .Where(b => b.AuctionID == auctionId)
                    .OrderByDescending(b => b.BidAmount)
                    .FirstOrDefaultAsync();

                // Check if the new bid is higher
                if (bidDto.BidAmount <= (highestBid?.BidAmount ?? 0))
                {
                    return BadRequest("Bid amount must be higher than the current highest bid.");
                }

                var bidderIdClaim = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "UserID");
                if (bidderIdClaim == null)
                {
                    return Unauthorized("User not authenticated.");
                }
                var bidderId = int.Parse(bidderIdClaim.Value);

                // Create a new bid
                var newBid = new Bid
                {
                    AuctionID = auctionId,
                    BidderID = bidderId, 
                    BidAmount = bidDto.BidAmount,
                    BidTime = DateTime.Now
                };

                // Add the new bid to the database
                await _context.Bids.AddAsync(newBid);
                await _context.SaveChangesAsync();

                // Notify the auction owner about the new bid
                var auctionOwnerId = auction.SellerID;
                var messageForOwner = $"A new higher bid of {bidDto.BidAmount} has been placed on your auction: {auction.Title}.";
                await _notificationService.CreateNotification(auctionOwnerId, messageForOwner);

                // Notify the previous highest bidder (if there is one)
                if (highestBid != null && highestBid.BidderID != bidDto.BidderID) // Check if there is a previous highest bidder
                {
                    var messageForPreviousBidder = $"Your bid has been outbid on the auction: {auction.Title}.";
                    await _notificationService.CreateNotification(highestBid.BidderID, messageForPreviousBidder);
                }

                return Ok(newBid);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}

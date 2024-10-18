using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;
using Backend.DTOs;
using Backend.Models;
using System.Linq;

namespace Backend.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class AuctionController : ControllerBase
	{
		private readonly AuctionDbContext _context;

		public AuctionController(AuctionDbContext context)
		{
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
			var auction = await _context.Auctions.FindAsync(id);

			if (auction == null)
			{
				return NotFound();
			}

			return auction;
		}

        [HttpPost("{id}/place")]
        [Authorize]
        public async Task<ActionResult> PlaceBid(int id, [FromBody] BidDto bidDto)  // Add 'int id' here
        {
            try
            {
                var userId = int.Parse(User.Claims.FirstOrDefault(c => c.Type == "UserID").Value);

                // Validate auction exists using id from route
                var auction = await _context.Auctions.FindAsync(id);
                if (auction == null)
                {
                    return NotFound(new { message = "Auction not found" });
                }

                // Check if the bid amount is higher than the current highest bid
                var highestBid = await _context.Bids
                    .Where(b => b.AuctionID == id)  // Compare with id from route
                    .OrderByDescending(b => b.BidAmount)
                    .FirstOrDefaultAsync();

                if (highestBid != null && bidDto.BidAmount <= highestBid.BidAmount)
                {
                    return BadRequest(new { message = "Bid must be higher than the current highest bid" });
                }

                // Create the new bid
                var newBid = new Backend.Models.Bid
                {
                    AuctionID = id,  // Use id from route
                    BidderID = userId,
                    BidAmount = bidDto.BidAmount,
                    BidTime = DateTime.UtcNow
                };

                _context.Bids.Add(newBid);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Bid placed successfully" });
            }
            catch (Exception ex)
            {
                // Log detailed error
                Console.WriteLine("Error placing bid: " + ex.Message);
                return StatusCode(500, new { message = "An error occurred while placing the bid." });
            }
        }


    }
}

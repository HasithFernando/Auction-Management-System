using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Security.Claims;
using Backend.Models;
using System.Threading.Tasks;

namespace Backend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class BidController : ControllerBase
	{
		private readonly AuctionDbContext _context;

		public BidController(AuctionDbContext context)
		{
			_context = context;
		}

		[HttpPost("placebid")]
		[Authorize] // Ensure that only authenticated users can place bids
		public async Task<IActionResult> PlaceBid(int auctionId, [FromBody] Bid bid)
		{
			// Validate the bid object
			if (bid == null || bid.BidAmount <= 0)
			{
				return BadRequest("Invalid bid.");
			}

			// Get the user's ID from the token
			var userId = GetUserIdFromToken();

			bid.BidderID = userId; // Set the current user's ID
			bid.AuctionID = auctionId; // Set the auction ID
			bid.BidTime = DateTime.UtcNow; // Set the current time

			// Check if the bid is higher than the current highest bid
			var currentHighestBid = await _context.Bids
				.Where(b => b.AuctionID == auctionId)
				.OrderByDescending(b => b.BidAmount)
				.FirstOrDefaultAsync();

			if (currentHighestBid != null && bid.BidAmount <= currentHighestBid.BidAmount)
			{
				return BadRequest("Bid amount must be higher than the current highest bid.");
			}

			// Add the new bid to the database
			_context.Bids.Add(bid);
			await _context.SaveChangesAsync();

			return Ok(new { message = "Bid placed successfully." });
		}

		[HttpGet("getbids/{auctionId}")]
		public async Task<IActionResult> GetBids(int auctionId)
		{
			var bids = await _context.Bids
				.Where(b => b.AuctionID == auctionId)
				.OrderByDescending(b => b.BidTime)
				.ToListAsync();

			return Ok(bids);
		}

		private int GetUserIdFromToken()
		{
			// Extract the user ID from the JWT token
			return int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
		}
	}
}

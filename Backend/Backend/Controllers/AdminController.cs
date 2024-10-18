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
    public class AdminController : ControllerBase
    {
        private readonly AuctionDbContext _context;

        public AdminController(AuctionDbContext context)
        {
            _context = context;
        }

        // 1. Get all users
        [HttpGet("users")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // 2. Delete user by ID
        [HttpDelete("users/{id}")]
        public async Task<ActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // 3. Get all auctions
        [HttpGet("auctions")]
        public async Task<ActionResult<IEnumerable<Auction>>> GetAuctions()
        {
            return await _context.Auctions.ToListAsync();
        }

        // 4. Delete auction by ID
        [HttpDelete("auctions/{id}")]
        public async Task<ActionResult> DeleteAuction(int id)
        {
            var auction = await _context.Auctions.FindAsync(id);
            if (auction == null) return NotFound();

            _context.Auctions.Remove(auction);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // 5. Site analytics (Example: get total number of bids)
        [HttpGet("analytics/bids")]
        public async Task<ActionResult<int>> GetTotalBids()
        {
            int totalBids = await _context.Bids.CountAsync();
            return Ok(totalBids);
        }

        // 6. Get count of all auctions
        [HttpGet("auctions/count")]
        public async Task<ActionResult<object>> GetAuctionCount()
        {
            try
            {
                int count = await _context.Auctions.CountAsync();
                return Ok(new { count });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error fetching auction count.", error = ex.Message });
            }
        }

        // 7. Get count of all users
        [HttpGet("users/count")]
        public async Task<ActionResult<object>> GetUserCount()
        {
            try
            {
                int count = await _context.Users.CountAsync();
                return Ok(new { count });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error fetching user count.", error = ex.Message });
            }
        }

        // 8. Get count of all bids
        [HttpGet("bids/count")]
        public async Task<ActionResult<object>> GetBidCount()
        {
            try
            {
                int count = await _context.Bids.CountAsync();
                return Ok(new { count });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error fetching bid count.", error = ex.Message });
            }
        }

        // 9. Get all bids
        [HttpGet("bids")]
        public async Task<ActionResult<IEnumerable<Bid>>> GetBids() 
        {
            var bids = await _context.Bids.ToListAsync();
            return Ok(bids);
        }

        // 10. Get bid by ID
        [HttpGet("bids/{id}")]
        public async Task<ActionResult<Bid>> GetBid(int id) 
        {
            var bid = await _context.Bids.FindAsync(id);
            if (bid == null) return NotFound();
            return Ok(bid); 
        }

        // 11. Delete bid by ID
        [HttpDelete("bids/{id}")]
        public async Task<ActionResult> DeleteBid(int id)
        {
            var bid = await _context.Bids.FindAsync(id);
            if (bid == null) return NotFound();

            _context.Bids.Remove(bid);
            await _context.SaveChangesAsync();
            return NoContent();
        }

    }
}


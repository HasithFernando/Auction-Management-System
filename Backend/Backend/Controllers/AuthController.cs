using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Backend.DTOs;
using Backend.Models;
using System.Threading.Tasks;
using System;
using BCrypt.Net;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuctionDbContext _context;

    public AuthController(AuctionDbContext context)
    {
        _context = context;
    }

    // POST: api/auth/register
    [HttpPost("register")]
    public async Task<ActionResult> Register(UserRegisterDto request)
    {
        if (await _context.Users.AnyAsync(u => u.Username == request.Username || u.Email == request.Email))
        {
            return BadRequest(new { message = "Username or Email already exists" });
        }

        // Hash the password before storing it
        string hashedPassword = HashPassword(request.Password);

        var newUser = new User
        {
            Username = request.Username,
            Email = request.Email,
            PasswordHash = hashedPassword,
            Role = request.Role,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _context.Users.Add(newUser);
        await _context.SaveChangesAsync();

        return Ok(new { message = "User registered successfully" });
    }

    private string HashPassword(string password)
    {
        return BCrypt.Net.BCrypt.HashPassword(password);
    }

    [HttpPost("login")]
    public async Task<ActionResult> Login(UserLoginDto request)
    {
        Console.WriteLine($"Login attempt for email: {request.Email}");

        var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == request.Email);

        if (user == null || !VerifyPassword(request.Password, user.PasswordHash))
        {
            return Unauthorized(new { message = "Invalid email or password" });
        }

        var token = GenerateJwtToken(user);
        return Ok(new { token });
    }

    private bool VerifyPassword(string password, string passwordHash)
    {
        return BCrypt.Net.BCrypt.Verify(password, passwordHash);
    }

    private string GenerateJwtToken(User user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("qFz2$8(1hP]9u7LJz6+K$2hG2v7b1mB!wG6#R@j*U0pH"));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim("UserID", user.UserID.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role)
        };

        var token = new JwtSecurityToken(
            issuer: "http://localhost:5229",
            audience: "http://localhost:3000",
            claims: claims,
            expires: DateTime.Now.AddHours(3),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    [HttpGet("profile")]
    [Authorize]
    public async Task<ActionResult> GetProfile()
    {
        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "UserID");
        if (userIdClaim == null)
        {
            return Unauthorized();
        }

        var userId = int.Parse(userIdClaim.Value);
        var user = await _context.Users.FindAsync(userId);

        if (user == null)
        {
            return NotFound();
        }

        var bids = await _context.Bids.Where(b => b.BidderID == userId).GroupBy(b => b.AuctionID).Select(g => new
        {
            AuctionID = g.Key,
            ItemName = _context.Auctions.Where(a => a.AuctionID == g.Key).Select(a => a.Title).FirstOrDefault(),
            YourBid = g.OrderByDescending(b => b.BidAmount).FirstOrDefault().BidAmount, // Your highest bid
            Status = "Active", // Or any relevant status logic
            AuctionEnd = _context.Auctions.Where(a => a.AuctionID == g.Key).Select(a => a.EndTime).FirstOrDefault() // Auction end time
        }).ToListAsync();

        var auctions = await _context.Auctions.Where(a => a.SellerID == userId).Select(a => new
         {
                AuctionID = a.AuctionID,
                Title = a.Title,
                // You can calculate bidCount and highestBid here
                BidCount = _context.Bids.Count(b => b.AuctionID == a.AuctionID),
                HighestBid = _context.Bids.Where(b => b.AuctionID == a.AuctionID).OrderByDescending(b => b.BidAmount).Select(b => b.BidAmount).FirstOrDefault(),
                EndTime = a.EndTime
            }).ToListAsync();

        return Ok(new
        {
            user.Username,
            user.Email,
            user.Role,
            auctionItems = auctions,
            bidHistory = bids
        });
    }
}

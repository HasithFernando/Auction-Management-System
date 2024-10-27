using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.DTOs; // Update the namespace according to your project structure
using Backend.Models; // Assuming you have a Models namespace for your entities

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationController : ControllerBase
    {
        private readonly AuctionDbContext _context;

        public NotificationController(AuctionDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Create a new notification.
        /// </summary>
        /// <param name="notificationDto">Notification data.</param>
        /// <returns>Action result.</returns>
        [HttpPost]
        [Authorize] // Ensure the user is authenticated
        public async Task<IActionResult> CreateNotification([FromBody] NotificationDto notificationDto)
        {
            if (notificationDto == null)
            {
                return BadRequest("Notification data is required.");
            }

            var notification = new Notification
            {
                UserID = notificationDto.UserID,
                MessageContent = notificationDto.MessageContent,
                IsRead = false,
                SentAt = DateTime.UtcNow
            };

            await _context.Notifications.AddAsync(notification);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetNotificationById), new { id = notification.NotificationID }, notification);
        }

        /// <summary>
        /// Get all notifications for a user.
        /// </summary>
        /// <param name="userId">User ID to filter notifications.</param>
        /// <returns>List of notifications.</returns>
        [HttpGet("{userId}")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Notification>>> GetNotificationsForUser(int userId)
        {
            var notifications = await _context.Notifications
                .Where(n => n.UserID == userId)
                .OrderByDescending(n => n.SentAt)
                .ToListAsync();

            return Ok(notifications);
        }

        /// <summary>
        /// Mark a notification as read.
        /// </summary>
        /// <param name="id">Notification ID.</param>
        /// <returns>Action result.</returns>
        [HttpPut("{id}/mark-read")]
        [Authorize]
        public async Task<IActionResult> MarkNotificationAsRead(int id)
        {
            var notification = await _context.Notifications.FindAsync(id);
            if (notification == null)
            {
                return NotFound("Notification not found.");
            }

            notification.IsRead = true;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        /// <summary>
        /// Get a notification by ID.
        /// </summary>
        /// <param name="id">Notification ID.</param>
        /// <returns>Notification data.</returns>
        [HttpGet("notification/{id}")]
        [Authorize]
        public async Task<ActionResult<Notification>> GetNotificationById(int id)
        {
            var notification = await _context.Notifications.FindAsync(id);
            if (notification == null)
            {
                return NotFound("Notification not found.");
            }

            return Ok(notification);
        }
    }
}


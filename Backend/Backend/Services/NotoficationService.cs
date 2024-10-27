using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Services
{
    public class NotificationService : INotificationService
    {
        private readonly AuctionDbContext _context;

        public NotificationService(AuctionDbContext context)
        {
            _context = context;
        }

        public async Task CreateNotification(int userId, string messageContent)
        {
            var notification = new Notification
            {
                UserID = userId,
                MessageContent = messageContent,
                SentAt = DateTime.Now
            };

            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Notification>> GetUserNotifications(int userId)
        {
            return await _context.Notifications
                .Where(n => n.UserID == userId)
                .OrderByDescending(n => n.SentAt) // Optional: Order by sent time
                .ToListAsync();
        }

        public async Task MarkNotificationAsRead(int notificationId)
        {
            var notification = await _context.Notifications.FindAsync(notificationId);
            if (notification != null)
            {
                notification.IsRead = true;
                await _context.SaveChangesAsync();
            }
        }
    }

}

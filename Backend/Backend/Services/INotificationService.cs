using Backend.Models;
using System.Threading.Tasks;

namespace Backend.Services
{
    public interface INotificationService
    {
        Task CreateNotification(int userId, string messageContent);
        Task<IEnumerable<Notification>> GetUserNotifications(int userId);
        Task MarkNotificationAsRead(int notificationId);
    }

}

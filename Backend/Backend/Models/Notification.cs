using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Notification
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int NotificationID { get; set; } 

        [Required]
        public int UserID { get; set; } 

        [Required]
        public string MessageContent { get; set; } 

        [Required]
        public bool IsRead { get; set; } = false; 

        [Required]
        public DateTime SentAt { get; set; } = DateTime.Now; 

        // Navigation property to associate with the User model
        [ForeignKey("UserID")]
        public virtual User User { get; set; }
    }
}

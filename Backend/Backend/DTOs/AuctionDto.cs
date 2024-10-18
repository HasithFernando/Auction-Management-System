namespace Backend.DTOs
{
    public class AuctionDTO
    {
        public int AuctionId { get; set; }
        public string Title { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}
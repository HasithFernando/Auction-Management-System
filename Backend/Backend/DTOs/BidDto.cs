namespace Backend.DTOs
{
    public class BidDto
    {
        public int AuctionID { get; set; }
        public int BidderID { get; set; }
        public decimal BidAmount { get; set; }
    }
}
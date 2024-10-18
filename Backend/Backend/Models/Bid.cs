namespace Backend.Models
{
    public class Bid
    {
        public int BidID { get; set; }
        public int AuctionID { get; set; }
        public int BidderID { get; set; }
        public decimal BidAmount { get; set; }
        public DateTime BidTime { get; set; }

        // Navigation properties (if needed)
        public Auction Auction { get; set; }
        public User Bidder { get; set; }
    }
}

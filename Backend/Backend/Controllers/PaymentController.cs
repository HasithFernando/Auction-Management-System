using Microsoft.AspNetCore.Mvc;
using Stripe;
using System;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        public PaymentController()
        {
            StripeConfiguration.ApiKey = Environment.GetEnvironmentVariable("STRIPE_SECRET_KEY");
        }

        [HttpPost("process")]
        public async Task<IActionResult> ProcessPayment([FromBody] PaymentRequest request)
        {
            try
            {
                var options = new ChargeCreateOptions
                {
                    Amount = request.Amount * 100, // Amount in cents
                    Currency = "usd",
                    Source = request.TokenId,
                    Description = "Payment for Auction Item"
                };

                var service = new ChargeService();
                Charge charge = await service.CreateAsync(options);

                return Ok(new { success = true, charge });
            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, error = ex.Message });
            }
        }
    }

    public class PaymentRequest
    {
        public int Amount { get; set; }
        public string TokenId { get; set; }
    }
}

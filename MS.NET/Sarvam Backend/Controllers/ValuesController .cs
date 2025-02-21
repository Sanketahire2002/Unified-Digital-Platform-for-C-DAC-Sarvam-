using Microsoft.AspNetCore.Mvc;

namespace Sarvam.Controllers
{
    public class ValuesController : Controller
    {
        [HttpGet("api/values")]
        public IActionResult Index()
        {
            return Ok(new[] { "Value1", "Value2" });
        }
    }
}

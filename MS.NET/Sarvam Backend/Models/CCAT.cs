namespace Sarvam.Models
{
    public class CCAT
    {
        public int Id { get; set; } // Primary key (auto-increment)
        public string FormNumber { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public DateTime DOB { get; set; }
        public string Gender { get; set; }
        public string Nationality { get; set; }
        public string AadharCard { get; set; }
        public int CCATRank { get; set; }
        public string MobileNumber { get; set; }
        public string Email { get; set; }
        public string Status { get; set; }
    }
}

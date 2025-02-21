using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Sarvam.Models
{
    public class QuizDetails
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int QuizId { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        [StringLength(100)]
        public string QuizTitle { get; set; }

        [Required]
        public TimeSpan StartTime { get; set; }

        [Required]
        public TimeSpan EndTime { get; set; }

        [Required]
        [Range(0, int.MaxValue)]
        public int Marks { get; set; }

        [Required]
        [StringLength(255)]
        public string Link { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        [Required]
        public DateTime UpdatedAt { get; set; }

        // Initialize the QuizResults collection to avoid null errors
        [JsonIgnore]
        public ICollection<QuizResults> QuizResults { get; set; } = new List<QuizResults>(); // Make it optional
    }
}

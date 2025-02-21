using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Sarvam.Models
{
    public class QuizResults
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ResultId { get; set; }

        [Required]
        public long PRN { get; set; }

        [Required]
        [ForeignKey("QuizDetails")]
        [Column("Quiz_id")]
        public int QuizId { get; set; }

        public QuizDetails? QuizDetails { get; set; }

        [Required]
        [Range(0, int.MaxValue)] // Marks should be non-negative
        public int ObtainedMarks { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Required]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Navigation Properties (Foreign Key relationships)
        [ForeignKey("PRN")]
        public MasterProfile? MasterProfile { get; set; }

        //[ForeignKey("QuizId")]
        //public QuizDetails? QuizDetails { get; set; }
    }
}

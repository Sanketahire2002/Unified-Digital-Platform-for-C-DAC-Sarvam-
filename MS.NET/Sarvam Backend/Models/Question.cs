using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Sarvam.Models
{
    public class Question
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int QuestionId { get; set; } // Primary Key

        [Required]
        public string QuestionText { get; set; }

        public string Option1 { get; set; }
        public string Option2 { get; set; }
        public string Option3 { get; set; }
        public string Option4 { get; set; }

        [Required]
        public string CorrectAnswer { get; set; }

        // Foreign Key linking to MasterModule
        [Required] // Ensure it is required in request
        [ForeignKey("MasterModule")]
        public int ModuleId { get; set; }

        // Exclude this from API requests but allow EF to use it internally
        [NotMapped] // Prevents it from being required in API input
        public MasterModule? MasterModule { get; set; }
    }
}

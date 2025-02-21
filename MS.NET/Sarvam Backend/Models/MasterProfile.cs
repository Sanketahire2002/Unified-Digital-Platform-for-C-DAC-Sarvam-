using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Sarvam.Models
{
    [Table("master_profiles")]
    public class MasterProfile
    {
        [Key]
        [Column("PRN")]
        public long PRN { get; set; } // Primary Key (PK), also used as FK

        [Required]
        [Column("first_name")] // Maps to the first_name column
        [MaxLength(50)]
        public string FirstName { get; set; }

        [Required]
        [Column("last_name")] // Maps to the last_name column
        [MaxLength(50)]
        public string LastName { get; set; }

        [Required]
        [Column("role")] // Maps to the role column
        [EnumDataType(typeof(RoleEnum))]
        public string Role { get; set; } = RoleEnum.Student.ToString();

        [Required]
        [Column("created_at")] // Maps to the created_at column
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Required]
        [Column("updated_at")] // Maps to the updated_at column
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Navigation Properties
        [NotMapped]
        public ICollection<MasterModule> MasterModules { get; set; } // Modules taught by the instructor
        [NotMapped]
        public ICollection<MasterModule> MoCoModules { get; set; } // Modules assigned to MoCo

        public ICollection<MasterResult> MasterResults { get; set; } // Results associated with this profile

        // Navigation Property
        public ICollection<QuizResults> QuizResults { get; set; }
    }

    // Enum to enforce valid roles in the application
    public enum RoleEnum
    {
        Student,
        Admin,
        CoCo,
        MoCo,
        Instructor,
        TPO
    }
}

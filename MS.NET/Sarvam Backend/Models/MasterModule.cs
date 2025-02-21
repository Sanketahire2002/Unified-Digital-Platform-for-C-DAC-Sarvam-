using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Sarvam.Models
{
    public class MasterModule
    {
        [Key]
        public int ModuleId { get; set; } // Primary Key (PK)
        public string ModuleName { get; set; }
        public DateTime ModuleStartDate { get; set; }
        public DateTime ModuleEndDate { get; set; }
        public long InstructorId { get; set; } // FK to MasterProfile.PRN (Instructor)
        public long MoCoId { get; set; } // FK to MasterProfile.PRN (MoCo)
        public byte NoOfDays { get; set; }
        public byte DurationHours { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        // Navigation Properties
        [NotMapped]
        public MasterProfile Instructor { get; set; } // Navigation Property for Instructor (MasterProfile)
        [NotMapped]
        public MasterProfile MoCo { get; set; } // Navigation Property for MoCo (MasterProfile)

        // Related subpoints for the module
        [NotMapped]
        public ICollection<MasterModuleSubpoint> MasterModuleSubpoints { get; set; }

        // One-to-Many Relationship with Questions
        public ICollection<Question> Questions { get; set; }

        // One-to-Many Relationship with MasterResults
        public ICollection<MasterResult> MasterResults { get; set; }

    }
}

using System.ComponentModel.DataAnnotations.Schema;

namespace Sarvam.Models
{
    public class MasterModuleSubpoint
    {
        public int SubId { get; set; } // Primary Key (PK)
        public int ModuleId { get; set; } // Foreign Key to MasterModule
        public string ModuleSubpointName { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        // Navigation Property
        [NotMapped]
        public MasterModule MasterModule { get; set; } // Reference to the MasterModule
        [NotMapped]
        public MasterProfile MasterProfile { get; set; }
    }
}

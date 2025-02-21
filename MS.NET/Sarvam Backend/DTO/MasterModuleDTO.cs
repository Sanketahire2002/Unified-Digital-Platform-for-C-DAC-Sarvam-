using System.ComponentModel.DataAnnotations.Schema;

namespace Sarvam.DTO
{
    public class MasterModuleDTO
    {
        public int ModuleId { get; set; }
        public string ModuleName { get; set; }
        public DateTime ModuleStartDate { get; set; }
        public DateTime ModuleEndDate { get; set; }
        public long InstructorId { get; set; }
        public string? InstructorName { get; set; }
        public string? InstructorLastName { get; set; }
        public long MoCoId { get; set; }
        public string? MoCoName { get; set; }
        public string? LastName { get; set; }
        public byte NoOfDays { get; set; }
        public byte DurationHours { get; set; }

        [NotMapped]
        public ICollection<MasterModuleSubpointDTO>? MasterModuleSubpoints { get; set; }

    }
}

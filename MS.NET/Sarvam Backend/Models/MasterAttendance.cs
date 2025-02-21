using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Sarvam.Models
{
    [Table("master_attendance")]
    public class MasterAttendance
    {
        [Key]
        [Column("attendance_id")]
        public int AttendanceId { get; set; }

        [ForeignKey("MasterProfile")]
        [Column("PRN")]
        public long PRN { get; set; }

        [Required]
        [Column("date")]
        public DateOnly Date { get; set; }

        [Required]
        [Column("status")]
        public bool Status { get; set; }

        // Adding created_at and updated_at columns
        [Required]
        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;  // Default value set to current time

        [Required]
        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;  // Default value set to current time

        // Mark the navigation property as optional
        public MasterProfile? MasterProfile { get; set; }
    }
}

using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Sarvam.Models
{
    [Table("user_credentials")]
    public class UserCredentials
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Column("PRN")] // Map to the 'PRN' column in the database
        public long PRN { get; set; }

        [Required]
        [Column("Password")] // Map to the 'Password' column
        [StringLength(20)]
        public string Password { get; set; }

        [Required]
        [Column("role")] // Map to the 'role' column
        public string Role { get; set; } = "Student"; // Default role is Student

        [Required]
        [Column("status")] // Map to the 'status' column
        public string Status { get; set; } = "Active"; // Default status is Active

        [Required]
        [Column("created_at")] // Map to the 'created_at' column
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        [Required]
        [Column("updated_at")] // Map to the 'updated_at' column
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}

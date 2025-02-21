using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Sarvam.Models
{
    [Table("user_credentials")] // Map to the database table
    public class UserCredential
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Column("PRN")]
        public long Prn { get; set; }

        [Column("Password")]
        [Required]
        [MaxLength(20)]
        public string Password { get; set; }

        [Column("role")]
        [Required]
        public string Role { get; set; }  // Enum values stored as string: "Admin", "Student"

        [Column("status")]
        [Required]
        public string Status { get; set; } // Enum values stored as string: "Active", "Inactive"

        [Column("created_at")]
        public DateTime CreatedAt { get; set; }

        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; }
    }
}
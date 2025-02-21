using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("master_leave_request")]
public class MasterLeaveRequest
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("request_id")]
    public int RequestId { get; set; }

    [ForeignKey("MasterProfile")]
    [Column("prn")]
    public long Prn { get; set; }

    [Required]
    [Column("from_date")]
    public DateTime FromDate { get; set; }

    [Required]
    [Column("end_date")]
    public DateTime EndDate { get; set; }

    [Required]
    [StringLength(255)]
    [Column("subject")]
    public string Subject { get; set; }

    [StringLength(255)]
    [Column("description")]
    public string Description { get; set; }

    [Required]
    [Column("status")]
    public string Status { get; set; } = "Pending";

    [Required]
    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.Now;

    [Required]
    [Column("updated_at")]
    public DateTime UpdatedAt { get; set; } = DateTime.Now;

    // Ensuring that the end_date is greater than from_date can be enforced in EF Core using Fluent API
    // which is explained below in OnModelCreating method of the DbContext class.
}

using Sarvam.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

public class MasterResult
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("result_id")]
    public int ResultId { get; set; }

    [Required]
    [ForeignKey("MasterModule")]
    [Column("module_id")]
    public int ModuleId { get; set; }

    public MasterModule? MasterModule { get; set; } //  Nullable to avoid validation error

    [Required]
    [ForeignKey("MasterProfile")]
    [Column("PRN")]
    public long PRN { get; set; }

    public MasterProfile? MasterProfile { get; set; } //  Nullable to avoid validation error

    [Range(0, 20)]
    [Column("internals_20")]
    public int? Internals20 { get; set; }

    [Range(0, 40)]
    [Column("lab_40")]
    public int? Lab40 { get; set; }

    [Range(0, 60)]
    [Column("ccee_60")]
    public int? Ccee60 { get; set; }

    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [Column("updated_at")]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

using System.ComponentModel.DataAnnotations;

namespace Eventy_System.DTOs;

public class RegisterUserDTO
{
    [Required]
    public string UserName {get; set;}
    [Required]
    public  string Password {get; set;}
    [Required]
    [EmailAddress]
    public  string Email {get; set;}
}
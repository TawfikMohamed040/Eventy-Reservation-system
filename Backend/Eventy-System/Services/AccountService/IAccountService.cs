using System.Formats.Tar;
using System.IdentityModel.Tokens.Jwt;
using Eventy_System.DTOs;
using Eventy_System.Models;
using Microsoft.AspNetCore.Identity;

namespace Eventy_System.Services.AccountService;

public interface IAccountService
{
    Task<IdentityResult> CreateUserAsync (RegisterUserDTO userDto);
    Task <ApplicationUser> FindByNameAsync(LoginDTO userDto);
    Task <bool> CheckPasswordAsync(ApplicationUser user,LoginDTO LoginDTO);
    Task <JwtSecurityToken> BuildToken(ApplicationUser user,LoginDTO userDto);

}
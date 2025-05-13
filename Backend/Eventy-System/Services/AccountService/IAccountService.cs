using Eventy_System.DTOs;
using Microsoft.AspNetCore.Identity;

namespace Eventy_System.Services.AccountService;

public interface IAccountService
{
    public Task<IdentityResult> CreateUserAsync(RegisterUserDTO userDto);

}
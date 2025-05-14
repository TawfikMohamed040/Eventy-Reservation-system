using System.IdentityModel.Tokens.Jwt;
using Eventy_System.DTOs;
using Eventy_System.Models;
using Eventy_System.Repositories.AccountRepository;
using Microsoft.AspNetCore.Identity;

namespace Eventy_System.Services.AccountService;

public class AccountService : IAccountService
{
    private readonly IAccountRepository _accountRepository;

    public AccountService(IAccountRepository accountRepository)
    {
        _accountRepository = accountRepository;
    }
    public async Task<IdentityResult> CreateUserAsync(RegisterUserDTO userDto)
    {
        return await _accountRepository.CreateUserAsync(userDto);
    }

    public async Task<ApplicationUser> FindByNameAsync(LoginDTO userDto)
    {
        return await _accountRepository.FindByNameAsync(userDto);
    }

    public async Task<bool> CheckPasswordAsync(ApplicationUser user, LoginDTO userDto)
    {
        return await  _accountRepository.CheckPasswordAsync(user, userDto);
    }

    public async Task<JwtSecurityToken> BuildToken(ApplicationUser user, LoginDTO userDto)
    {
        return await _accountRepository.BuildToken(user, userDto);
    }
}
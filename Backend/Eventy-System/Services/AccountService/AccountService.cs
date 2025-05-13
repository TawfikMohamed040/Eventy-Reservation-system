using Eventy_System.DTOs;
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
}
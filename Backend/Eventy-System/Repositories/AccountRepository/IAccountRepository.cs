using Eventy_System.DTOs;
using Microsoft.AspNetCore.Identity;

namespace Eventy_System.Repositories.AccountRepository;

public interface IAccountRepository
{
    Task<IdentityResult> CreateUserAsync (RegisterUserDTO userDto);
}
using Eventy_System.DTOs;
using Eventy_System.Models;
using Eventy_System.Repositories.AccountRepository;
using Microsoft.AspNetCore.Identity;

public class AccountRepository : IAccountRepository
{
    private readonly UserManager<ApplicationUser> _userManager;
    public AccountRepository(UserManager<ApplicationUser> userManager)
    {
          _userManager = userManager;
    }
    public async Task<IdentityResult> CreateUserAsync(RegisterUserDTO userDto)
    {
        ApplicationUser user = new ApplicationUser();
        user.UserName = userDto.UserName;
        user.Email = userDto.Email;
        
        IdentityResult identityResult = await _userManager.CreateAsync(user , userDto.Password);

        return identityResult;
    }
    
    
}
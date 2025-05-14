using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Eventy_System.DTOs;
using Eventy_System.Models;
using Eventy_System.Repositories.AccountRepository;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

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

    public async Task<ApplicationUser> FindByNameAsync(LoginDTO userDto)
    {
        return await _userManager .FindByNameAsync(userDto.UserName);
    }

    public async Task<bool> CheckPasswordAsync(ApplicationUser user ,LoginDTO userDto)
    {
        return await _userManager.CheckPasswordAsync(user, userDto.Password);
    }

    public async Task<JwtSecurityToken> BuildToken(ApplicationUser user ,LoginDTO userDto)
    {
        List<Claim> claims = new List<Claim>();
        claims.Add(new Claim(JwtRegisteredClaimNames.Jti , Guid.NewGuid().ToString()));
        // claims.Add(new Claim(ClaimTypes.Role , "User"));
        claims.Add(new Claim(ClaimTypes.NameIdentifier, user.Id));
        claims.Add(new Claim(ClaimTypes.Name , user.UserName));
        
        var symmetricScKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("aasfsfsdfmljcnasdlcnnn324u39u4931689#&#^$^*sdgaga"));
        SigningCredentials signingCredentials = new SigningCredentials(symmetricScKey,SecurityAlgorithms.HmacSha256);
                    
        JwtSecurityToken token = new JwtSecurityToken(
            issuer:"http://localhost:5281/", 
            audience:"http://localhost:3000/",
            expires:DateTime.Now.AddDays(30),
            claims:claims,
            signingCredentials:signingCredentials
        );
        return token;
    }
}
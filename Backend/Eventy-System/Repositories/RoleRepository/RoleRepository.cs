using Eventy_System.DTOs;
using Eventy_System.Models;
using Microsoft.AspNetCore.Identity;

namespace Eventy_System.Repositories.RoleRepository;

public class RoleRepository : IRoleRepository
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    public RoleRepository( UserManager<ApplicationUser> userManager , RoleManager<IdentityRole> roleManager)
    {
        _userManager = userManager;
        _roleManager = roleManager; 
    }
    public async Task<IdentityResult> AddRoleToUserAsync(RoleDTO roleDto)
    {
        ApplicationUser  user = await _userManager.FindByNameAsync(roleDto.UserId);
        IdentityResult res = await _userManager.AddToRoleAsync(user , roleDto.RoleName);
        return res;
    }

    public async Task<IdentityResult> CreateRoleAsync(string roleName)
    {
        IdentityRole identityRole = new IdentityRole();
        identityRole.Name = roleName;
        IdentityResult res = await _roleManager.CreateAsync(identityRole);
        return res;
    }
}
using Eventy_System.DTOs;
using Eventy_System.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Eventy_System.Repositories.RoleRepository;

public class RoleRepository : IRoleRepository
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public RoleRepository(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        _userManager = userManager;
        _roleManager = roleManager;
    }

    public async Task<IdentityResult> ChangeUserRoleAsync(RoleDTO roleDto)
    {
        ApplicationUser user = await _userManager.FindByNameAsync(roleDto.UserName);
        if (user == null)
            return IdentityResult.Failed(new IdentityError { Description = "User not found." });
        

        var currentRoles = await _userManager.GetRolesAsync(user);

        var removeResult = await _userManager.RemoveFromRolesAsync(user, currentRoles);
        if (!removeResult.Succeeded)
            return removeResult;
        

        var roleExists = await _roleManager.RoleExistsAsync(roleDto.RoleName);
        if (!roleExists)
            return IdentityResult.Failed(new IdentityError { Description = "Role does not exist." });
        

        var addResult = await _userManager.AddToRoleAsync(user, roleDto.RoleName);
        return addResult;
    }

    public async Task<IdentityResult> CreateRoleAsync(string roleName)
    {
        IdentityRole identityRole = new IdentityRole();
        identityRole.Name = roleName;
        IdentityResult res = await _roleManager.CreateAsync(identityRole);
        return res;
    }

    public async Task<IEnumerable<ApplicationUser>> GetAllUsersAsync()
    {
        var users = (await _userManager.Users.ToListAsync()).Where(x => x.UserName != "Admin");
        return users;
    }
}
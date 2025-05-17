using Eventy_System.DTOs;
using Eventy_System.Models;
using Microsoft.AspNetCore.Identity;

namespace Eventy_System.Repositories.RoleRepository;

public interface IRoleRepository
{
    public Task<IdentityResult> ChangeUserRoleAsync(RoleDTO roleDto);
    public Task<IdentityResult> CreateRoleAsync(string roleName);
    
    public Task<IEnumerable<ApplicationUser>> GetAllUsersAsync();
}
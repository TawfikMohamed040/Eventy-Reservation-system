using Eventy_System.DTOs;
using Microsoft.AspNetCore.Identity;

namespace Eventy_System.Services.RoleService;

public interface IRoleService
{
    public Task<IdentityResult> AddRoleToUserAsync(RoleDTO roleDto);
    public Task<IdentityResult> CreateRoleAsync(string roleName);
}
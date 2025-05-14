using Eventy_System.DTOs;
using Microsoft.AspNetCore.Identity;

namespace Eventy_System.Repositories.RoleRepository;

public interface IRoleRepository
{
    public Task<IdentityResult> AddRoleToUserAsync(RoleDTO roleDto);
    public Task<IdentityResult> CreateRoleAsync(string roleName);
}
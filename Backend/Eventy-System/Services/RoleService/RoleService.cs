using Eventy_System.DTOs;
using Eventy_System.Models;
using Eventy_System.Repositories.RoleRepository;
using Microsoft.AspNetCore.Identity;

namespace Eventy_System.Services.RoleService;

public class RoleService : IRoleService
{
    private readonly IRoleRepository _roleRepository;
    public RoleService(IRoleRepository roleRepository)
    {
        _roleRepository = roleRepository;
    }
    
    public async Task<IdentityResult> ChangeUserRoleAsync(RoleDTO roleDto)
    {
        return await   _roleRepository.ChangeUserRoleAsync(roleDto);
    }

    public async Task<IdentityResult> CreateRoleAsync(string roleName)
    {
        return await _roleRepository.CreateRoleAsync(roleName);
    }

    public async Task<IEnumerable<ApplicationUser>> GetAllUsersAsync()
    {
        return await _roleRepository.GetAllUsersAsync();
    }
}
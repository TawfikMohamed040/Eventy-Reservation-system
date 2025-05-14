
using Eventy_System.DTOs;
using Eventy_System.Services.RoleService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;


namespace Eventy_System.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = "Bearer", Roles = "Admin")]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _roleService;
        public RoleController(IRoleService roleService)
        {
            _roleService = roleService;
        }
        [HttpPost("CreateNewRole/{roleName}")]
        public async Task<IActionResult> CreateNewRole(string roleName)
        {
             IdentityResult res = await _roleService.CreateRoleAsync(roleName);
             if (res.Succeeded)
                 return Ok("Role created successfully");
             return BadRequest();
        }
        [HttpPost("AddRoleToUser")]
        public async Task<IActionResult> AddRoleToUser(RoleDTO roleDto)
        {
            IdentityResult res = await _roleService.AddRoleToUserAsync(roleDto);
            if (res.Succeeded)
                return Ok("Role added successfully");
            return BadRequest();
        }
        
    }
}



using Eventy_System.DTOs;
using Eventy_System.Services.RoleService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NuGet.Protocol;


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
                 return Ok("Role created successfully".ToJson());
             return BadRequest();
        }
        [HttpPost("ChangeUserRole")]
        public async Task<IActionResult> ChangeUserRole(RoleDTO roleDto)
        {
            IdentityResult res = await _roleService.ChangeUserRoleAsync(roleDto);
            if (res.Succeeded)
                return Ok("Role added successfully".ToJson());
            return BadRequest();
        }

        [HttpGet("GetAllUsers")]
        public async Task<IActionResult> GetAllUsers()
        {
            return  Ok(await _roleService.GetAllUsersAsync());
        }
    }
}


using Eventy_System.DTOs;
using Eventy_System.Services.AccountService;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly IAccountService _accountService;

    public AccountController(IAccountService accountService)
    {
        _accountService = accountService;
    }
    [HttpPost("Register")]
    public async Task<IActionResult> Register(RegisterUserDTO userDto)
    {
        if (ModelState.IsValid)
        {
            IdentityResult result = await _accountService.CreateUserAsync(userDto);
            if (result.Succeeded)
                return Ok("User created successfully");
            foreach (var item in result.Errors)
            {
                ModelState.AddModelError(string.Empty, item.Description);
            }
        }
        return BadRequest(ModelState);
    }
    
    [HttpPost ("Login")]
    public IActionResult Login(LoginDTO userDto)
    {
        if (ModelState.IsValid)
        {
            
        }
        return Ok("Hello from EventsController!");
    }
}
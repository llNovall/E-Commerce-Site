using Microsoft.AspNetCore.Identity;

namespace Domain.Entities.Account
{
    public class AppUser : IdentityUser
    {
        public AppUser(string userName) : base(userName)
        {
        }
    }
}
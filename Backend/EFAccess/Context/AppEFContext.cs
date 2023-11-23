using Domain.Entities.Account;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace EFAccess.Context
{
    public class AppEFContext : IdentityDbContext<AppUser>
    {
        public AppEFContext(DbContextOptions options) : base(options)
        {
        }
    }
}
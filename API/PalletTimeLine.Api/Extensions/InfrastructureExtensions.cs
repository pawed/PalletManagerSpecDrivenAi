using Microsoft.EntityFrameworkCore;
using PalletTimeLine.Api.Infrastructure.Data;

namespace PalletTimeLine.Api.Extensions;

public static class InfrastructureExtensions
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection");

        if (!string.IsNullOrWhiteSpace(connectionString))
        {
            services.AddDbContext<PalletTimelineDbContext>(opt =>
                opt.UseNpgsql(connectionString));
        }
        else
        {
            services.AddDbContext<PalletTimelineDbContext>(opt =>
                opt.UseInMemoryDatabase("PalletTimeLine"));
        }

        return services;
    }
}

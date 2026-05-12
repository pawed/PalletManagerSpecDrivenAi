using System.Reflection;
using FluentValidation;
using PalletTimeLine.Api.Application.Services;

namespace PalletTimeLine.Api.Extensions;

public static class ApplicationServicesExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddScoped<ITaskService, TaskService>();
        services.AddScoped<ITaskCommentService, TaskCommentService>();
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<ICostService, CostService>();
        services.AddScoped<IRevenueService, RevenueService>();
        services.AddScoped<IWarehouseService, WarehouseService>();
        services.AddScoped<IOverviewService, OverviewService>();
        services.AddScoped<IAuditService, AuditService>();
        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
        return services;
    }
}

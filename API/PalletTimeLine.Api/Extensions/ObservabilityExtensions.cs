using OpenTelemetry.Resources;
using OpenTelemetry.Trace;
using OpenTelemetry.Metrics;
using Serilog;
using Serilog.Formatting.Compact;

namespace PalletTimeLine.Api.Extensions;

public static class ObservabilityExtensions
{
    public static IHostBuilder AddSerilogLogging(this IHostBuilder hostBuilder)
    {
        return hostBuilder.UseSerilog((ctx, cfg) =>
        {
            cfg.ReadFrom.Configuration(ctx.Configuration)
               .Enrich.FromLogContext()
               .Enrich.WithProperty("Application", "PalletManager.Api")
               .WriteTo.Console(new RenderedCompactJsonFormatter());
        });
    }

    public static IServiceCollection AddObservability(this IServiceCollection services)
    {
        services.AddOpenTelemetry()
            .ConfigureResource(r => r.AddService("PalletManager.API", serviceVersion: "1.0.0"))
            .WithTracing(tracing => tracing
                .AddAspNetCoreInstrumentation(opts => opts.RecordException = true)
                .AddEntityFrameworkCoreInstrumentation()
                .AddHttpClientInstrumentation())
            .WithMetrics(metrics => metrics
                .AddAspNetCoreInstrumentation());

        return services;
    }
}

using Microsoft.EntityFrameworkCore;
using PalletTimeLine.Api.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
if (!string.IsNullOrWhiteSpace(connectionString))
{
    builder.Services.AddDbContext<PalletTimelineDbContext>(options =>
        options.UseNpgsql(connectionString));
}
else
{
    builder.Services.AddDbContext<PalletTimelineDbContext>(options =>
        options.UseInMemoryDatabase("PalletTimeLine"));
}

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<PalletTimelineDbContext>();
    db.Database.EnsureCreated();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();

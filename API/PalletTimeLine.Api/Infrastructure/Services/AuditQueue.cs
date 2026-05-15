using System.Threading.Channels;
using PalletTimeLine.Api.Application.Services;
using PalletTimeLine.Api.Domain.Entities;

namespace PalletTimeLine.Api.Infrastructure.Services;

public class AuditQueue : IAuditQueue
{
    private readonly Channel<AuditLog> _channel = Channel.CreateUnbounded<AuditLog>(
        new UnboundedChannelOptions { SingleReader = true });

    public void Enqueue(AuditLog entry) => _channel.Writer.TryWrite(entry);
    public ChannelReader<AuditLog> Reader => _channel.Reader;
}

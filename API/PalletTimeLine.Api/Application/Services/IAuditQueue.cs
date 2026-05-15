using System.Threading.Channels;
using PalletTimeLine.Api.Domain.Entities;

namespace PalletTimeLine.Api.Application.Services;

public interface IAuditQueue
{
    void Enqueue(AuditLog entry);
    ChannelReader<AuditLog> Reader { get; }
}

namespace PalletTimeLine.Api.Models
{
    
        public class Editions
        {
            public Guid Id { get; private set; }
            public int Year { get; private set; }
            public string Name { get; private set; }
            public string? Description { get; private set; }
            public DateOnly StartDate { get; private set; }
            public DateOnly EndDate { get; private set; }
            public EditionStatus Status { get; private set; }
            public DateTime CreatedAt { get; private set; }
            public DateTime? UpdatedAt { get; private set; }

        public ICollection<TaskItem> Tasks { get; private set; } = [];
        public ICollection<RevenueItem> Incomes { get; private set; } = [];
        public ICollection<CostItem> Outcomes { get; private set; } = [];
    }

    public enum EditionStatus
    {
        Draft = 0,
        Active = 1,
        Archived = 2
    }
}

using FluentValidation;
using PalletTimeLine.Api.Application.DTOs;
using PalletTimeLine.Api.Domain.Entities;

namespace PalletTimeLine.Api.Application.Validators;

public class TaskCreateDtoValidator : AbstractValidator<TaskCreateDto>
{
    public TaskCreateDtoValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("Title is required.")
            .MaximumLength(500).WithMessage("Title must not exceed 500 characters.");

        RuleFor(x => x.Status)
            .Must(s => Enum.TryParse<TaskItemStatus>(s, true, out _))
            .WithMessage("Invalid status value.");

        RuleFor(x => x.Priority)
            .Must(p => Enum.TryParse<TaskItemPriority>(p, true, out _))
            .WithMessage("Invalid priority value.");

        RuleFor(x => x.Category)
            .NotEmpty().WithMessage("Category is required.")
            .MaximumLength(100).WithMessage("Category must not exceed 100 characters.");
    }
}

using FluentValidation;
using PalletTimeLine.Api.Application.DTOs;

namespace PalletTimeLine.Api.Application.Validators;

public class TaskCommentCreateDtoValidator : AbstractValidator<TaskCommentCreateDto>
{
    public TaskCommentCreateDtoValidator()
    {
        RuleFor(x => x.Content)
            .NotEmpty().WithMessage("Content is required.")
            .MaximumLength(2000).WithMessage("Content must not exceed 2000 characters.");

        RuleFor(x => x.AuthorId)
            .NotEmpty().WithMessage("AuthorId is required.");
    }
}

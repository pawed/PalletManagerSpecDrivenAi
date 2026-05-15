import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { toast } from 'sonner';
import { cn } from '../lib/utils';
import { TASK_CATEGORIES } from '../data/tasks';
import { MultiSelect } from './ui/multi-select';
import * as taskService from '../services/taskService.js';

const STATUS_OPTIONS = [
  { value: 'NotStarted', label: 'Nie rozpoczęte' },
  { value: 'InProgress', label: 'W trakcie'      },
  { value: 'Done',       label: 'Zrobione'       },
  { value: 'Blocked',    label: 'Zablokowane'    },
  { value: 'Deleted',    label: 'Usunięte'       },
];

const schema = z.object({
  task: z.string()
    .min(1, 'Tytuł jest wymagany')
    .max(150, 'Maks. 150 znaków'),
  note: z.string()
    .max(500, 'Maks. 500 znaków'),
});

const TaskModal = ({ mode, task, people, onClose, onSave }) => {
  const isEdit = mode === 'edit';
  const isView = mode === 'view';

  const [form, setForm] = useState(() => ({
    task:         isEdit ? (task.task ?? '') : '',
    status:       isEdit ? (task.status ?? 'NotStarted') : 'NotStarted',
    completeDate: isEdit ? (task.completeDate ?? '') : '',
    category:     isEdit ? (task.category ?? TASK_CATEGORIES[0]?.id ?? '') : (TASK_CATEGORIES[0]?.id ?? ''),
    who:          isEdit ? (task.who ?? []).map((w) => (typeof w === 'object' ? w.id : w)) : [],
    note:         isEdit ? (task.note ?? '') : '',
  }));
  const [errors,  setErrors]  = useState({});
  const [saving,  setSaving]  = useState(false);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const set = (key, value) => {
    setForm(f => ({ ...f, [key]: value }));
    if (key === 'task' || key === 'note') {
      const result = schema.shape[key].safeParse(value);
      setErrors(prev => ({
        ...prev,
        [key]: result.success ? undefined : result.error.issues[0].message,
      }));
    }
  };

  const hasErrors = Object.values(errors).some(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const result = schema.safeParse(form);
    if (!result.success) {
      const fe = result.error.flatten().fieldErrors;
      setErrors({ task: fe.task?.[0], note: fe.note?.[0] });
      setSaving(false);
      return;
    }
    try {
      if (isEdit) {
        await taskService.update(task.id, form);
        toast.success('Zadanie zaktualizowane');
      } else {
        await taskService.create(form);
        toast.success('Zadanie dodane');
      }
      onSave();
    } catch (err) {
      toast.error(isEdit ? 'Nie udało się zapisać' : 'Nie udało się dodać', {
        description: err.message,
      });
    } finally {
      setSaving(false);
    }
  };

  const personOptions = people.map(p => (typeof p === 'object'
    ? { value: p.id, label: p.displayName }
    : { value: p, label: p }
  ));

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <form
        className="modal"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        {/* Header */}
        <div className="modal__head">
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="modal__eyebrow">
              {isView ? `Szczegóły · #${task.id.slice(-4).toUpperCase()}` : isEdit ? `Edycja zadania · #${task.id.slice(-4).toUpperCase()}` : 'Nowe zadanie'}
            </div>
            <input
              className={cn('modal__title-input', (isEdit || isView) && 'opacity-60 cursor-not-allowed')}
              value={form.task}
              readOnly={isEdit || isView}
              autoFocus={!isEdit && !isView}
              onChange={isEdit || isView ? undefined : (e) => set('task', e.target.value)}
              placeholder="Nazwa zadania"
            />
            <div className="flex items-center justify-between mt-0.5">
              {errors.task
                ? <p className="text-[11px] text-red-500">{errors.task}</p>
                : <span />}
              {!isEdit && (
                <span className={cn(
                  'text-[10px] font-mono',
                  form.task.length > 140 ? 'text-red-500' : 'text-muted-foreground'
                )}>
                  {form.task.length}/150
                </span>
              )}
            </div>
          </div>
          <button type="button" className="modal__close" onClick={onClose} aria-label="Zamknij">
            ×
          </button>
        </div>

        {/* Body */}
        <div className="modal__body">
          {/* Status */}
          <div className="modal__row">
            <span className="modal__label">Status</span>
            <select className="modal__input" value={form.status} disabled={isView}
              onChange={isView ? undefined : (e) => set('status', e.target.value)}>
              {STATUS_OPTIONS.map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          {/* Complete date */}
          <div className="modal__row">
            <span className="modal__label">Termin</span>
            <input type="date" className="modal__input" value={form.completeDate} readOnly={isView}
              onChange={isView ? undefined : (e) => set('completeDate', e.target.value)} />
          </div>

          {/* Category */}
          <div className="modal__row">
            <span className="modal__label">Kategoria</span>
            <select className="modal__input" value={form.category} disabled={isView}
              onChange={isView ? undefined : (e) => set('category', e.target.value)}>
              {TASK_CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{c.pl}</option>
              ))}
            </select>
          </div>

          {/* Assignees */}
          <div className="modal__row">
            <span className="modal__label">Przypisani</span>
            <MultiSelect
              options={personOptions}
              selected={form.who}
              onChange={isView ? undefined : (vals) => set('who', vals)}
              placeholder="Wybierz osoby"
              tags
              disabled={isView}
            />
          </div>

          {/* Note */}
          <div className="modal__row modal__row--block">
            <div className="flex items-center justify-between">
              <span className="modal__label">Szczegóły</span>
              {!isView && (
                <span className={cn(
                  'text-[10px] font-mono',
                  form.note.length > 480 ? 'text-red-500' : 'text-muted-foreground'
                )}>
                  {form.note.length}/500
                </span>
              )}
            </div>
            <textarea
              className={cn('modal__input modal__textarea', errors.note && 'border-red-500')}
              rows={3}
              value={form.note}
              readOnly={isView}
              onChange={isView ? undefined : (e) => set('note', e.target.value)}
              placeholder="Dodatkowe uwagi…"
            />
            {errors.note && (
              <p className="text-[11px] text-red-500 mt-0.5">{errors.note}</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="modal__foot">
          {isView ? (
            <button type="button" className="icon-btn icon-btn--primary" onClick={onClose}>
              Zamknij
            </button>
          ) : (
            <>
              <button type="button" className="icon-btn" onClick={onClose} disabled={saving}>
                Anuluj
              </button>
              <button
                type="submit"
                className="icon-btn icon-btn--primary"
                disabled={saving || hasErrors}
              >
                {saving ? '…' : isEdit ? 'Zapisz' : 'Dodaj'}
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskModal;

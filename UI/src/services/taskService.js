// Task service — maps GET /api/Tasks and PATCH /api/Tasks/{id}/status
// API TaskDto fields:
//   id (uuid), title, who (string[]|null), completeDate (string|null),
//   status (enum name: NotStarted|InProgress|Done|Blocked|Deleted),
//   priority (enum name: Critical|High|Ordinary|Low|NiceToHave),
//   category, description (string|null)
//
// Backend enum names are used as-is throughout the UI (source of truth).
import { get, patch, post, put } from './api.js';

// Normalise a single API TaskDto — field renames only, no status mapping.
const normalise = (t) => ({
  id:           t.id,
  task:         t.title ?? '',
  who:          t.who   ?? [],
  completeDate: t.completeDate ?? null,
  status:       t.status   ?? 'NotStarted',
  priority:     t.priority ?? 'Ordinary',
  category:     t.category ?? '',
  note:         t.description ?? '',
});

export const getAll = () =>
  get('/Tasks').then((data) => data.map(normalise));

export const getById = (id) =>
  get(`/Tasks/${id}`).then(normalise);

export const updateStatus = (id, status) =>
  patch(`/Tasks/${id}/status`, { status });

export const create = (data) => {
  const body = {
    title:        data.task,
    description:  data.note || null,
    completeDate: data.completeDate || null,
    status:       data.status   ?? 'NotStarted',
    priority:     data.priority ?? 'Ordinary',
    category:     data.category,
    who:          data.who ?? [],
  };
  return post('/Tasks', body).then(normalise);
};

export const update = (id, data) => {
  const body = {
    title:        data.task,
    description:  data.note || null,
    completeDate: data.completeDate || null,
    status:       data.status   ?? 'NotStarted',
    priority:     data.priority ?? 'Ordinary',
    category:     data.category,
    who:          data.who ?? [],
  };
  return put(`/Tasks/${id}`, body).then(normalise);
};

// Task service — maps GET /api/Tasks and PATCH /api/Tasks/{id}/status
// API TaskDto fields match UI shape exactly:
//   id (uuid string), task, who (string[]), date (string|null),
//   status, category, note (string|null)
import { get, patch } from './api.js';

/**
 * Normalise nullable API fields to values the UI expects.
 * note: null  -> ""
 * date: null  -> null  (UI already handles null with "—")
 * who:  null  -> []
 */
const normalise = (t) => ({
  ...t,
  who:  t.who  ?? [],
  note: t.note ?? '',
  date: t.date ?? null,
});

export const getAll = () =>
  get('/Tasks').then((data) => data.map(normalise));

export const getById = (id) =>
  get(`/Tasks/${id}`).then(normalise);

/**
 * Update only the status field of a task.
 * @param {string} id   - UUID of the task
 * @param {string} status - new status value
 */
export const updateStatus = (id, status) =>
  patch(`/Tasks/${id}/status`, { status });

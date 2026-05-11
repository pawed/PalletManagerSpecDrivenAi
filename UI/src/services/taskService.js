// Task service — maps GET /api/Tasks and PATCH /api/Tasks/{id}/status
// API TaskDto (v3) fields:
//   id (uuid), title, who (string[]|null), date (string|null),
//   status (enum name: NotStarted|InProgress|Done|Blocked|Deleted),
//   priority (enum name: Critical|High|Ordinary|Low|NiceToHave),
//   category, description (string|null)
//
// UI expects:
//   id, task, who, date, status (todo|in-progress|done|cancelled), priority, category, note
import { get, patch } from './api.js';

// Map API enum names → UI status strings
const API_STATUS_TO_UI = {
  NotStarted: 'todo',
  InProgress: 'in-progress',
  Done:       'done',
  Blocked:    'todo',      // no UI bucket for Blocked — treat as todo
  Deleted:    'cancelled',
};

// Map UI status strings → API enum names
const UI_STATUS_TO_API = {
  'todo':        'NotStarted',
  'in-progress': 'InProgress',
  'done':        'Done',
  'cancelled':   'Deleted',
};

/**
 * Normalise a single API TaskDto to the shape the UI expects.
 * - title       → task
 * - description → note     (null → "")
 * - who         → who      (null → [])
 * - date        → date     (null → null)
 * - status enum → UI status string
 * - priority    → priority (pass-through enum name, default "Ordinary")
 */
const normalise = (t) => ({
  id:       t.id,
  task:     t.title ?? '',
  who:      t.who  ?? [],
  date:     t.date ?? null,
  status:   API_STATUS_TO_UI[t.status] ?? 'todo',
  priority: t.priority ?? 'Ordinary',
  category: t.category ?? '',
  note:     t.description ?? '',
});

export const getAll = () =>
  get('/Tasks').then((data) => data.map(normalise));

export const getById = (id) =>
  get(`/Tasks/${id}`).then(normalise);

/**
 * Update only the status field of a task.
 * Accepts the UI status string and converts it to the API enum name.
 * @param {string} id     - UUID of the task
 * @param {string} status - UI status string (todo|in-progress|done|cancelled)
 */
export const updateStatus = (id, status) =>
  patch(`/Tasks/${id}/status`, { status: UI_STATUS_TO_API[status] ?? status });

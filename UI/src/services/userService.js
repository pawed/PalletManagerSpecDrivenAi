// User service — maps GET /api/Users
// API UserDto: id (uuid), firstName, lastName, userName, displayName, isActive
// UI uses displayName strings as person names (the "who" array in tasks).
import { get } from './api.js';

export const getAll = () => get('/Users');

/**
 * Returns a flat array of displayName strings for active users —
 * compatible with the PEOPLE array in data/tasks.js.
 */
export const getPeopleNames = () =>
  get('/Users').then((users) =>
    users
      .filter((u) => u.isActive)
      .map((u) => u.displayName ?? `${u.firstName ?? ''} ${u.lastName ?? ''}`.trim())
      .filter(Boolean)
  );

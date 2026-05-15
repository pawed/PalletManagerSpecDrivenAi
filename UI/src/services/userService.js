// User service — maps GET /api/Users
// API UserDto: id (uuid), firstName, lastName, userName, displayName, isActive
import { get } from './api.js';

export const getAll = () => get('/Users');

// Returns active users as { id, displayName }[] — used for task assignment.
export const getPeople = () =>
  get('/Users').then((users) =>
    users
      .filter((u) => u.isActive)
      .map((u) => ({
        id: u.id,
        displayName: u.displayName ?? `${u.firstName ?? ''} ${u.lastName ?? ''}`.trim(),
      }))
      .filter((u) => u.displayName)
  );

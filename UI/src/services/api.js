// Base API wrapper — proxied through Vite to http://localhost:5000
const BASE_URL = '/api';

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, options);
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  if (res.status === 204 || res.headers.get('content-length') === '0') return null;
  return res.json();
}

export const get  = (path)        => request(path);
export const patch = (path, body) => request(path, {
  method:  'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body:    JSON.stringify(body),
});
export const post = (path, body)  => request(path, {
  method:  'POST',
  headers: { 'Content-Type': 'application/json' },
  body:    JSON.stringify(body),
});
export const put  = (path, body)  => request(path, {
  method:  'PUT',
  headers: { 'Content-Type': 'application/json' },
  body:    JSON.stringify(body),
});
export const del  = (path)        => request(path, { method: 'DELETE' });

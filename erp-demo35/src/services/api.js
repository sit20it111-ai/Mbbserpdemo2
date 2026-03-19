const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
export async function get(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}`);
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}
export async function post(endpoint, data) {
  const res = await fetch(`${BASE_URL}${endpoint}`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data) });
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}

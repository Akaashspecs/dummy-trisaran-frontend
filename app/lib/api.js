export const BASE_URL = " http://localhost:4000";
// or during development

export async function apiPost(endpoint, data) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) throw new Error(json.error || "Something went wrong");

  return json;
}

export async function apiGet(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Something went wrong");

  return json;
}

export async function apiDelete(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Something went wrong");

  return json;
}

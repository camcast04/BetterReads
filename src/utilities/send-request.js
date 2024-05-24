export default async function sendRequest(url, method = 'GET', payload = null) {
  const options = { method };
  if (payload) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(payload);
  }

  const token = localStorage.getItem('token');
  if (token) {
    options.headers = options.headers || {};
    options.headers.Authorization = `Bearer ${token}`;
  }

  console.log('Sending request to:', url);
  console.log('Options:', options);

  let res = await fetch(url, options);

  if (res.status === 401) {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      const refreshRes = await fetch('/api/auth/refresh-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (refreshRes.ok) {
        const { accessToken } = await refreshRes.json();
        localStorage.setItem('token', accessToken);
        options.headers.Authorization = `Bearer ${accessToken}`;
        res = await fetch(url, options);
      }
    }
  }

  if (res.ok) return res.json();
  const errorMessage = await res.text();
  throw new Error(errorMessage || 'Bad Request');
}

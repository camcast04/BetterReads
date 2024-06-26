//better-reads/src/utilities/send-request.js

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
        body: JSON.stringify({ refreshToken })
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



// export default async function sendRequest(url, method = 'GET', payload = null) {
//   const options = { method };
//   if (payload) {
//     options.headers = { 'Content-Type': 'application/json' };
//     options.body = JSON.stringify(payload);
//   }

//   const token = localStorage.getItem('token');
//   if (token) {
//     options.headers = options.headers || {};
//     options.headers.Authorization = `Bearer ${token}`;
//   }

//   console.log('Sending request to:', url);
//   console.log('Options:', options);

//   const res = await fetch(url, options);
//   if (res.ok) return res.json();
//   const errorMessage = await res.text();
//   throw new Error(errorMessage || 'Bad Request');
// }



// import { getToken } from './users-service';

// export default async function sendRequest(url, method = 'GET', payload = null) {
//   // Fetch accepts an options object as the 2nd argument
//   // used to include a data payload, set headers, specifiy the method, etc.
//   const options = { method };
//   if (payload) {
//     options.headers = { 'Content-Type': 'application/json' };
//     options.body = JSON.stringify(payload);
//   }
//   const token = getToken();
//   if (token) {
//     // Need to add an Authorization header
//     // Use the Logical OR Assignment operator
//     options.headers ||= {};
//     // Older approach
//     // options.headers = options.headers || {};
//     options.headers.Authorization = `Bearer ${token}`;
//   }
//   const res = await fetch(url, options);
//   // if res.ok is false then something went wrong
//   if (res.ok) return res.json();
//   throw new Error('Bad Request');
// }


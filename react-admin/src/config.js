export const config = {
    remoteHost: process.env.NODE_ENV === 'production'
        ? window.location.origin
        : 'http://localhost:8000',
    pageSize: 10,
    apiVersion: 'v1',
    timeout: 5000,
    defaultLanguage: 'en',
    endpoints: {
      users: '/users',
      products: '/products',
      auth: '/auth'
    }
  };
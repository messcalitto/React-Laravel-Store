export const config = {
    remoteHost: process.env.NODE_ENV === 'production'
        ? window.location.origin
        : 'http://localhost:8000',
    pageSize: 6,
    stripeKey: 'pk_test_51H2JdeHi7psR8GxrIbKKzyOvtFjAOvYsRBFJYOMgaeGO0O0rXMR1kzKZ03nppuuW4etPYCxXceIUMhTZnohYpmJ700PxGMamtU',
    apiVersion: 'v1',
    timeout: 5000,
    defaultLanguage: 'en',
  };
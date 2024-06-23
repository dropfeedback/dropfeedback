export const CONFIG = {
  googleClientId:
    import.meta.env?.GOOGLE_CLIENT_ID ||
    "108576727290-r2vpjvnub36682vn3vig0rq1jvj9to2n.apps.googleusercontent.com",
  nodeEnv: import.meta.env?.NODE_ENV,
} as const;

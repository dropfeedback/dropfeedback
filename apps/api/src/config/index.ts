const throwEnvError = (key: string) => {
  const variable = process.env[key];
  if (!variable) throw new Error(`Missing environment variable: ${key}`);

  return variable;
};

export const config = () => {
  return {
    port: parseInt(process.env.PORT || '8080', 10),
    APP_URL: throwEnvError('APP_URL'),
    DATABASE_URL: throwEnvError('DATABASE_URL'),
    ACCESS_TOKEN_SECRET: throwEnvError('ACCESS_TOKEN_SECRET'),
    REFRESH_TOKEN_SECRET: throwEnvError('REFRESH_TOKEN_SECRET'),
    EMAIL_TOKEN_SECRET: throwEnvError('EMAIL_TOKEN_SECRET'),
    CLIENT_SECRET: throwEnvError('CLIENT_SECRET'),
    REFRESH_TOKEN: throwEnvError('REFRESH_TOKEN'),
    EMAIL: throwEnvError('EMAIL'),
    ACCESS_TOKEN_EXPIRES_IN: 24 * 60 * 60 * 1000, // 1 day
    REFRESH_TOKEN_EXPIRES_IN: 7 * 24 * 60 * 60 * 1000, // 7 days
    EMAIL_TOKEN_EXPIRES_IN: 15 * 24 * 60 * 60 * 1000, // 15 days
    GOOGLE_CLIENT_ID: throwEnvError('GOOGLE_CLIENT_ID'),
  } as const;
};

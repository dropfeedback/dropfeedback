const throwEnvError = (key: string) => {
  const variable = process.env[key];
  if (!variable) throw new Error(`Missing environment variable: ${key}`);

  return variable;
};

export const config = () => {
  return {
    port: parseInt(process.env.PORT || '3001', 10),
    DATABASE_URL: throwEnvError('DATABASE_URL'),
    ACCESS_TOKEN_SECRET: throwEnvError('ACCESS_TOKEN_SECRET'),
    REFRESH_TOKEN_SECRET: throwEnvError('REFRESH_TOKEN_SECRET'),
    EMAIL_TOKEN_SECRET: throwEnvError('EMAIL_TOKEN_SECRET'),
    ACCESS_TOKEN_EXPIRES_IN: 15 * 60 * 1000, // 15 minutes
    REFRESH_TOKEN_EXPIRES_IN: 7 * 24 * 60 * 60 * 1000, // 7 days
    EMAIL_TOKEN_EXPIRES_IN: 15 * 24 * 60 * 60 * 1000, // 15 days
  } as const;
};

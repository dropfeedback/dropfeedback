const throwEnvError = (key: string) => {
  const variable = process.env[key];
  if (!variable) throw new Error(`Missing environment variable: ${key}`);

  return variable;
};

export const config = () => {
  return {
    port: parseInt(process.env.PORT_API || '3001', 10),
    DATABASE_URL: throwEnvError('DATABASE_URL'),
    ACCESS_TOKEN_SECRET: throwEnvError('ACCESS_TOKEN_SECRET'),
    REFRESH_TOKEN_SECRET: throwEnvError('REFRESH_TOKEN_SECRET'),
    ACCESS_TOKEN_EXPIRES_IN: '1week',
    REFRESH_TOKEN_EXPIRES_IN: '1week',
  } as const;
};

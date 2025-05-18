export const logger = {
  debug: (message: unknown, ...args: unknown[]): void => {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log(message, ...args);
    }
  },
  info: (message: unknown, ...args: unknown[]): void => {
    // eslint-disable-next-line no-console
    console.log(message, ...args);
  },
  warn: (message: unknown, ...args: unknown[]): void => {
    console.warn(message, ...args);
  },
  error: (message: unknown, ...args: unknown[]): void => {
    console.error(message, ...args);
  },
};

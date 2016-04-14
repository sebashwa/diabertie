let logger;

if (process.env.NODE_ENV == 'test') {
  const noop = () => {};
  logger = { log: noop, error: noop, debug: noop };
} else {
  logger = console;
};

export default logger;

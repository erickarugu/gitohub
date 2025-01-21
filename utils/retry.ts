export const retryWithExponentialBackoff = (
  fn: () => Promise<any>,
  maxAttempts = 3,
  baseDelayMs = 10
) => {
  let attempt = 1;

  const execute = async () => {
    try {
      return await fn();
    } catch (error) {
      if (attempt >= maxAttempts) {
        throw error;
      }

      const delayMs = baseDelayMs * 2 ** attempt;
      console.log(`Retry attempt ${attempt} after ${delayMs}ms`);
      await new Promise((resolve) => setTimeout(resolve, delayMs));

      attempt++;
      return execute();
    }
  };

  return execute();
};

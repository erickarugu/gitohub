import { retryWithExponentialBackoff } from "./retry";

describe("retryWithExponentialBackoff", () => {
  // Set timeout to 1 minute (60000ms)
  jest.setTimeout(60000);

  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(console, "log").mockImplementation();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it("should return successful result without retrying", async () => {
    const mockFn = jest.fn().mockResolvedValue("success");

    const result = await retryWithExponentialBackoff(mockFn);

    expect(result).toBe("success");
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("should retry on failure and eventually succeed", async () => {
    const mockFn = jest
      .fn()
      .mockRejectedValueOnce(new Error("Attempt 1 failed"))
      .mockRejectedValueOnce(new Error("Attempt 2 failed"))
      .mockResolvedValue("success");

    const resultPromise = retryWithExponentialBackoff(mockFn, 3, 10);

    // Fast-forward and flush promises between each timer
    await jest.runAllTimersAsync();

    const result = await resultPromise;

    expect(result).toBe("success");
    expect(mockFn).toHaveBeenCalledTimes(3);
    expect(console.log).toHaveBeenCalledWith("Retry attempt 1 after 20ms");
    expect(console.log).toHaveBeenCalledWith("Retry attempt 2 after 40ms");
  });

  it("should use custom base delay", async () => {
    const mockFn = jest
      .fn()
      .mockRejectedValueOnce(new Error("Failed"))
      .mockResolvedValue("success");

    const resultPromise = retryWithExponentialBackoff(mockFn, 3, 10);

    // Fast-forward and flush promises between each timer
    await jest.runAllTimersAsync();

    await resultPromise;

    expect(console.log).toHaveBeenCalledWith("Retry attempt 1 after 20ms");
  });
});

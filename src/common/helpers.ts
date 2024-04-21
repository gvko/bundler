export const PromiseTimeoutErrorMsg = 'Timeout';

/**
 * Returns a promise that resolves or rejects based on the first settled promise
 * between the provided promise and a timeout.
 *
 * @template T The type of the resolved value of the input promise.
 * @param {Promise<T>} promise The promise to race against.
 * @param {number} timeoutSec  The timeout duration in seconds.
 * @returns {Promise<T>} A promise that settles based on the first settled promise
 * (either the input promise or the timeout).
 * @throws {Error} - Throws an error with the message 'Timeout' if the timeout is reached.
 */
export async function racePromiseWithTimeout<T>(
  promise: Promise<T>,
  timeoutSec: number,
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(PromiseTimeoutErrorMsg)), timeoutSec * 1000),
    ),
  ]);
}

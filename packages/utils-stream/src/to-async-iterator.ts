// TODO: update @moeru/std
// export { readableStreamToAsyncIterator as toAsyncIterator } from '@moeru/std/async-iterator'
/** @see {@link https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream#browser_compatibility} */
export async function* toAsyncIterator<T>(
  stream: ReadableStream<T>,
): AsyncGenerator<T, void, unknown> {
  const reader = stream.getReader()
  try {
    while (true) {
      const { done, value } = await reader.read()

      if (done)
        return

      yield value
    }
  }
  finally {
    reader.releaseLock()
  }
}

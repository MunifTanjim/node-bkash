class BKashError extends Error {
  constructor(message, meta, headers) {
    super(Array.isArray(message) ? message.join(', ') : message)

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor)

    this.name = this.constructor.name
    this.meta = meta
    this.headers = headers
  }
}

module.exports = BKashError

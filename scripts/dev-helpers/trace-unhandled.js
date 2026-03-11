// Small helper to print full stack for unhandled rejections during dev.
// This file is required via NODE_OPTIONS so we can capture stacks that
// Next/Turbopack might otherwise hide.

process.on('unhandledRejection', (reason, promise) => {
  try {
    if (reason && reason instanceof Error) {
      console.error('\n=== Unhandled Rejection (caught by trace-unhandled) ===\n', reason.stack || reason);
    } else {
      console.error('\n=== Unhandled Rejection (non-Error) ===\n', reason);
    }
  } catch (err) {
    // Fallback
    console.error('Failed to pretty-print unhandled rejection:', err, reason);
  }
});

// Also hook uncaughtException to get immediate crashes
process.on('uncaughtException', (err) => {
  console.error('\n=== Uncaught Exception (caught by trace-unhandled) ===\n', err && err.stack ? err.stack : err);
  // Let process exit after logging so dev tools can surface the cause
});

module.exports = {};

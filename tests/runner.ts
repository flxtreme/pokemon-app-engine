export type LogResult = {
  label: string;
  passed: boolean;
  duration: number;
  error?: string;
};

const COLORS = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  gray: "\x1b[90m",
  bold: "\x1b[1m",
};

const padRight = (str: string, len: number) =>
  str + " ".repeat(Math.max(0, len - str.length));

/** Display formatted test results like a table */
export const printResults = (results: LogResult[]) => {
  const divider = COLORS.gray + "-".repeat(64) + COLORS.reset;

  console.log(divider);

  for (const r of results) {
    const status = r.passed
      ? `${COLORS.green}[PASS]${COLORS.reset}`
      : `${COLORS.red}[FAIL]${COLORS.reset}`;

    const label = padRight(r.label, 48);
    const time = `${COLORS.gray}${r.duration.toFixed(1)}ms${COLORS.reset}`;

    console.log(`${status} ${label} ${time}`);
    console.log(divider);
  }

  

  const total = results.length;
  const passedCount = results.filter((r) => r.passed).length;
  const failedCount = total - passedCount;

  const summary =
    passedCount === total
      ? `${COLORS.green}${passedCount}/${total} passed${COLORS.reset}`
      : `${COLORS.red}${failedCount} failed${COLORS.reset}, ${COLORS.green}${passedCount} passed${COLORS.reset}`;

  console.log(summary);
  console.log();
};

/** Define a test */
export const createTest = (label: string, fn: () => any) => ({ label, fn });

/** Run tests with timing and logging */
export const runTest = async (tests: ReturnType<typeof createTest>[]) => {
  const results: LogResult[] = [];

  for (const t of tests) {
    const start = performance.now();
    try {
      const ok = await t.fn();
      const duration = performance.now() - start;
      results.push({ label: t.label, passed: Boolean(ok), duration });
    } catch (err: any) {
      const duration = performance.now() - start;
      results.push({
        label: t.label,
        passed: false,
        duration,
        error: err?.message || String(err),
      });
    }
  }

  // ✅ SHOW LOGS
  printResults(results);

  // Return simple boolean array for flexibility
  return results.map(r => r.passed);
};

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

let passed = 0;
let failed = 0;

export function test(description, fn) {
  try {
    fn();
    passed++;
    console.log(`  ✓ ${description}`);
  } catch (e) {
    failed++;
    console.log(`  ✗ ${description}`);
    if (e instanceof assert.AssertionError) {
      console.log(`    expected: ${JSON.stringify(e.expected)}`);
      console.log(`    actual:   ${JSON.stringify(e.actual)}`);
    } else {
      console.log(`    ${e.message}`);
    }
  }
}

export { assert };

// Auto-run if executed directly
const mainPath = process.argv[1];
if (mainPath && !mainPath.includes('runner')) {
  const exerciseName = mainPath.split('/').pop();
  console.log(`\n📘 ${exerciseName}`);
  console.log('━'.repeat(40));
}

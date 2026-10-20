// Module script - always in strict mode
const output5 = document.getElementById('output5');

// In strict mode, this would throw an error:
// undefinedVar = "This would throw ReferenceError";

function moduleStrictTest() {
    // In strict mode, 'this' is undefined in regular functions
    return this === undefined ? 'Strict mode (this = undefined)' : 'Sloppy mode';
}

const result = moduleStrictTest();

output5.innerHTML += `

<span class="success">🟢 Module script (always strict):</span>

  Mode: ${result}
  <span class="console-log">// Automatically in strict mode</span>

  // undefinedVar = "value"
  <span class="console-log">// Would throw ReferenceError in strict mode</span>

<span class="warning">⚠️  Result:</span>
  Module scripts are ALWAYS in strict mode.
  No need to add "use strict" - it's automatic.
`;

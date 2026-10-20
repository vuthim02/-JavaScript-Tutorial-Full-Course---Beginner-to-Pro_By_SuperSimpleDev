// Traditional script - strict mode is opt-in
const output5 = document.getElementById('output5');

// Without "use strict", this is allowed (but bad practice)
undefinedVar = "This creates a global variable";
const result = traditionalStrictTest();

function traditionalStrictTest() {
    // Without strict mode, 'this' is window in regular functions
    return this === window ? 'Sloppy mode (this = window)' : 'Strict mode';
}

output5.innerHTML = `
<span class="error">🔴 Traditional script (no "use strict"):</span>

  Mode: ${result}
  <span class="console-log">// Not in strict mode by default</span>

  undefinedVar = "value"
  <span class="console-log">// Implicit globals allowed in sloppy mode</span>

<span class="warning">⚠️  Result:</span>
  Traditional scripts are in "sloppy mode" by default.
  Must add "use strict" at the top to enable strict mode.
`;

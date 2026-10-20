// Module script - can use import/export
import { greeting, add, PI } from './utils.js';

const result = add(5, 3);

const output2 = document.getElementById('output2');
output2.innerHTML = `
<span class="success">✓ Module script with import/export:</span>

  import { greeting, add, PI } from './utils.js';
  <span class="console-log">// Successfully imported!</span>

  greeting = "${greeting}"
  add(5, 3) = ${result}
  PI = ${PI}

<span class="warning">⚠️  Result:</span>
  Module scripts fully support ES6 import/export syntax.
`;

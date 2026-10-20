// Traditional script - cannot use import/export
const output2 = document.getElementById('output2');

output2.innerHTML += `
<span class="error">✗ Traditional script cannot use import:</span>

  // This would be a syntax error:
  // import { greeting } from './utils.js';

  <span class="warning">Result:</span>
  Traditional scripts do NOT support import/export syntax.
  Use <script type="module"> for that functionality.
`;

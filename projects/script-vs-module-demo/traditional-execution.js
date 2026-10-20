// Traditional script - executes immediately
const testElement = document.getElementById('test-element');
const output3 = document.getElementById('output3');

output3.innerHTML = `
<span class="error">🔴 Traditional script execution:</span>

  Executed: ${new Date().toLocaleTimeString()}
  DOM element found: ${testElement ? 'YES' : 'NO'}
  <span class="console-log">// Runs immediately, may not find later DOM elements</span>
`;

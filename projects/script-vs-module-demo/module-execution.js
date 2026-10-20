// Module script - deferred execution
const testElement = document.getElementById('test-element');
const output3 = document.getElementById('output3');

output3.innerHTML += `

<span class="success">🟢 Module script execution:</span>

  Executed: ${new Date().toLocaleTimeString()}
  DOM element found: ${testElement ? 'YES' : 'NO'}
  <span class="console-log">// Deferred - runs after DOM is fully parsed</span>

<span class="warning">⚠️  Result:</span>
  Module scripts are automatically deferred.
  Traditional scripts execute immediately (unless using defer/async).
`;

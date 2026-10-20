// Module script - supports top-level await
const output4 = document.getElementById('output4');

output4.innerHTML = `
<span class="success">🟢 Module script with top-level await:</span>

  const result = await new Promise(...)
  <span class="console-log">// Waiting 500ms...</span>
`;

const result = await new Promise(resolve => {
    setTimeout(() => resolve('Async operation complete!'), 500);
});

output4.innerHTML += `
  Result: "${result}"
  <span class="console-log">// Top-level await works in modules!</span>

<span class="warning">⚠️  Result:</span>
  Module scripts support top-level await.
  Traditional scripts do not.
`;

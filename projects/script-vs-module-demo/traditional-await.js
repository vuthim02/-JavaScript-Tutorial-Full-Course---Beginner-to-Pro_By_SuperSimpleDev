// Traditional script - cannot use top-level await
const output4 = document.getElementById('output4');

output4.innerHTML += `

<span class="error">🔴 Traditional script - top-level await:</span>

  // This would be a SyntaxError:
  // const result = await Promise.resolve('test');

  <span class="warning">Result:</span>
  Traditional scripts CANNOT use top-level await.
  Must use async function or IIFE instead.
`;

// Module script - variable stays in module scope
const moduleVar = "I'm in module scope!";

// This variable is NOT added to window
console.log('Module script variable (local):', moduleVar);
console.log('window.moduleVar:', window.moduleVar); // undefined

// Explicitly add something to window for comparison
window.moduleVarExplicit = "This was explicitly added to window";

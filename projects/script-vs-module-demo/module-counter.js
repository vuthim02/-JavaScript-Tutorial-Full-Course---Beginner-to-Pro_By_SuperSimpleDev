// Module script counter - executes only once (cached)
if (!window.moduleCounter) {
    window.moduleCounter = 0;
}
window.moduleCounter++;

console.log('Module script execution count:', window.moduleCounter);

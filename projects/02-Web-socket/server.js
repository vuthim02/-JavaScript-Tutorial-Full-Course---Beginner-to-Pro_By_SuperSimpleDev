const log = document.getElementById('log');

const ws = new WebSocket('ws://localhost:8000/ws');

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    const line = document.createElement('div');

    line.innerHTML = `
    [${data.type}]
    ${data.step || data.node || data.domain || ""}
    ${data.ip || ""}
    ${data.status || ""}
    `;

    log.appendChild(line);
    log.scrollTop = log.scrollHeight;
};

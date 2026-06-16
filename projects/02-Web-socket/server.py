import asyncio
import json
import random
from fastapi import FastAPI, WebSocket
import uvicorn

app = FastAPI()

clients = []

# ----------------------------
# DNS DATABASE (fake internet)
# ----------------------------
DNS_TABLE = {
    "google.com": "142.250.183.14",
    "openai.com": "104.18.12.123",
    "github.com": "140.82.112.3"
}

# ----------------------------
# NETWORK PATH
# ----------------------------
path = ["Client", "Router", "DNS", "Router", "Server"]

# ----------------------------
# DNS SIMULATION
# ----------------------------
async def dns_lookup(domain):
    await asyncio.sleep(1.5)  # simulate delay

    ip = DNS_TABLE.get(domain, "0.0.0.0")

    return {
        "type": "DNS_RESPONSE",
        "domain": domain,
        "ip": ip,
        "status": "resolved"
    }

# ----------------------------
# TCP HANDSHAKE SIMULATION
# ----------------------------
async def tcp_handshake():
    steps = [
        "SYN",
        "SYN-ACK",
        "ACK"
    ]

    for step in steps:
        msg = {
            "type": "TCP",
            "step": step,
            "status": "handshake"
        }

        await broadcast(msg)
        await asyncio.sleep(1)

# ----------------------------
# BROADCAST FUNCTION
# ----------------------------
async def broadcast(data):
    dead_clients = []

    for client in clients:
        try:
            await client.send_text(json.dumps(data))
        except:
            dead_clients.append(client)

    for d in dead_clients:
        clients.remove(d)

# ----------------------------
# MAIN SIMULATION LOOP
# ----------------------------
async def simulation_loop():
    while True:

        # 1. CLIENT REQUEST
        request = {
            "type": "REQUEST",
            "url": "https://google.com",
            "status": "start"
        }
        await broadcast(request)
        await asyncio.sleep(1)

        # 2. DNS STEP
        dns = await dns_lookup("google.com")
        await broadcast(dns)

        await asyncio.sleep(1)

        # 3. TCP HANDSHAKE
        await tcp_handshake()

        # 4. PACKET FLOW
        for node in path:
            packet = {
                "type": "PACKET",
                "node": node,
                "status": "moving",
                "latency": round(random.uniform(1, 15), 2)
            }

            await broadcast(packet)
            await asyncio.sleep(1)

        # 5. RESPONSE
        response = {
            "type": "HTTP",
            "status": 200,
            "data": "<html>Google Home Page</html>"
        }

        await broadcast(response)

        await asyncio.sleep(3)

# ----------------------------
# WEBSOCKET SERVER
# ----------------------------
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    clients.append(websocket)

    try:
        while True:
            await asyncio.sleep(10)
    except:
        clients.remove(websocket)

# ----------------------------
# START SERVER + ENGINE
# ----------------------------
@app.on_event("startup")
async def start_engine():
    asyncio.create_task(simulation_loop())

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000) 
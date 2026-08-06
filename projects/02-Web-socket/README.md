# Live TCP + DNS Network Simulator

A real-time network simulation tool that visualizes DNS resolution, TCP handshakes, and packet routing using WebSockets.

## Features

- Real-time visualization of network processes
- DNS lookup simulation with fake internet database
- TCP 3-way handshake demonstration (SYN → SYN-ACK → ACK)
- Packet flow tracking across network nodes (Client → Router → DNS → Router → Server)
- HTTP response simulation
- Live WebSocket updates

## Tech Stack

- **Backend**: Python 3 with FastAPI + Uvicorn
- **Frontend**: Vanilla JavaScript + HTML/CSS
- **Communication**: WebSockets

## Prerequisites

- Python 3.7+
- pip (Python package manager)

## Installation

1. Clone or download this project
2. Install dependencies:

```bash
pip install fastapi uvicorn
```

## Usage

1. Start the server:

```bash
python server.py
```

2. Open your browser and navigate to:

```
http://localhost:8000
```

3. Watch the simulation run automatically in the browser console

## How It Works

The simulation follows this sequence:

1. **Client Request** - Browser initiates a request to google.com
2. **DNS Lookup** - Resolves domain name to IP address (142.250.183.14)
3. **TCP Handshake** - Establishes connection with 3-step handshake
4. **Packet Flow** - Data travels through network nodes
5. **HTTP Response** - Server returns the response (200 OK)

## Project Structure

```
02-Web-socket/
├── index.html      # Frontend HTML
├── server.py       # Python FastAPI server
├── server.js       # Client-side WebSocket logic
└── style.css       # Styling (terminal-like theme)
```

## Customization

Edit the `DNS_TABLE` in `server.py` to add custom domain-to-IP mappings:

```python
DNS_TABLE = {
    "google.com": "142.250.183.14",
    "openai.com": "104.18.12.123",
    "github.com": "140.82.112.3"
}
```

## Use Cases

- Learning networking concepts (DNS, TCP/IP, HTTP)
- Teaching network protocols in classrooms
- Interview preparation for networking questions
- Understanding network latency and packet flow

## License

Educational project for learning purposes.

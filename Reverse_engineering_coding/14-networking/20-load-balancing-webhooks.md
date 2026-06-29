# 20. Load Balancing and Webhooks

<img src="https://media.giphy.com/media/DX1cytoIQvnmgqBlQ3/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Load Balancing — Distributing Traffic

### Algorithms

| Algorithm | How it works | When to use |
|-----------|-------------|-------------|
| **Round Robin** | Requests distributed evenly in sequence | Equal capacity servers |
| **Least Connections** | Sends to server with fewest active connections | Unequal load, long-lived connections |
| **IP Hash** | Same client IP always goes to same server | Session affinity |
| **Weighted** | Servers receive proportionally based on weight | Different server capacities |

### Node Cluster vs Nginx Load Balancing

```
Node Cluster: All workers on same machine, share port
Client → Master → Worker 1, Worker 2, Worker 3

Nginx Load Balancer: Across multiple machines
Client → Nginx → Server 1 (:3000), Server 2 (:3000), Server 3 (:3000)
```

### Nginx Load Balancing Configuration

```nginx
upstream node_backend {
    server 10.0.0.1:3000 weight=3;
    server 10.0.0.2:3000 weight=1;
    server 10.0.0.3:3000 backup;  # Only if others down
}

server {
    listen 80;
    location / {
        proxy_pass http://node_backend;
    }
}
```

## Webhooks — Server-to-Server Callbacks

### What are Webhooks?

**Webhook**: When an event happens, Service A sends an HTTP POST to Service B's URL.

```
Stripe (Payment Event)
  │── POST https://myapp.com/webhooks/stripe
  │   { "type": "charge.succeeded", "data": { ... } }
My App processes the event
```

### Webhook Receiver

```javascript
app.post('/webhooks/stripe', (req, res) => {
    const sig = req.headers['stripe-signature'];
    try {
        const event = stripe.webhooks.constructEvent(
            req.body, sig, process.env.STRIPE_WEBHOOK_SECRET
        );
        switch (event.type) {
            case 'charge.succeeded': handleChargeSucceeded(event.data.object); break;
        }
        res.status(200).json({ received: true });
    } catch (err) {
        res.status(400).json({ error: 'Invalid signature' });
    }
});
```

### Webhook Best Practices

| Practice | Why |
|----------|-----|
| **Verify signature** | Ensure webhook is from trusted source |
| **Respond quickly (200)** | Provider may retry on non-200 |
| **Process async** | Don't block the response |
| **Idempotency** | Same event may be sent multiple times |

```javascript
const processedEvents = new Set();

app.post('/webhooks/stripe', async (req, res) => {
    const eventId = req.body.id;
    if (processedEvents.has(eventId)) {
        return res.status(200).json({ received: true });
    }
    processedEvents.add(eventId);
    setImmediate(() => processEvent(req.body));
    res.status(200).json({ received: true });
});
```

### Webhooks vs Polling

```
Polling:
Client: "Any updates?" → Server: "No"
Client: "Any updates?" → Server: "No"
Client: "Any updates?" → Server: "Yes!"
(Wasteful: most checks return nothing)

Webhook:
Server: POST /webhook → Client (instant notification)
```
## Next Steps

[Back to Chapter 19](19-api-gateway-reverse-proxy.md): 19. API Gateway and Reverse Proxy
[Proceed to Chapter 21](21-tactical-questions-projects.md): 21. Reverse Engineering Tactical Questions and Projects to learn about 21. reverse engineering tactical questions and projects.

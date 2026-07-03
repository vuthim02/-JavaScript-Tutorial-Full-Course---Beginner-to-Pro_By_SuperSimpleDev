# SOAP — Simple Object Access Protocol

```mermaid
mindmap
  root((SOAP))
    Definition
      Protocol for web services
      Exchanges structured info
      XML-based messaging
      Platform independent
    Message Structure
      Envelope
        Header
          Auth tokens
          Routing info
          Transaction IDs
        Body
          Request / Response data
        Fault
          Error details
          Fault code
          Fault string
    Transport
      HTTP / HTTPS
      SMTP
      JMS
      TCP
    Features
      WSDL contract
      WS-Security
      WS-Addressing
      WS-ReliableMessaging
      ACID transactions
    Versions
      SOAP 1.1
      SOAP 1.2
```

```mermaid
graph TD
    A[Client] -->|SOAP Envelope XML| B[HTTP POST]
    B --> C[Web Server]
    C --> D[SOAP Processor]
    D --> E{Parse Envelope}
    E --> F[Read Header]
    E --> G[Read Body]
    G --> H[Invoke Service]
    H --> I[Generate Response]
    I --> J[SOAP Envelope XML]
    J -->|HTTP Response| A

    subgraph SOAP_Message
        K[Envelope]
        L[Header]
        M[Body]
        N[Fault]
    end

    style A fill:#4a90d9,color:#fff
    style C fill:#4a90d9,color:#fff
    style D fill:#4a90d9,color:#fff
    style K fill:#e67e22,color:#fff
    style L fill:#e67e22,color:#fff
    style M fill:#e67e22,color:#fff
    style N fill:#e74c3c,color:#fff
```

```mermaid
blockquote
    SOAP is a protocol for exchanging XML-based messages over a network.
    It uses an Envelope that wraps the Header and Body.
    The Header carries metadata (security, routing).
    The Body carries the actual request or response data.
    A Fault element reports errors.
    SOAP is often paired with WSDL for service description.
```

## Example SOAP Request

```xml
<?xml version="1.0"?>
<soap:Envelope
  xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
  soap:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">

  <soap:Header>
    <auth:Authentication xmlns:auth="http://example.com/auth">
      <auth:Token>abc123</auth:Token>
    </auth:Authentication>
  </soap:Header>

  <soap:Body>
    <getPrice xmlns="http://example.com/stock">
      <symbol>GOOG</symbol>
    </getPrice>
  </soap:Body>

</soap:Envelope>
```

## Key Takeaways

| Concept | Description |
|---------|-------------|
| **Envelope** | Root element, mandatory, defines XML namespaces |
| **Header** | Optional, carries metadata (security, routing) |
| **Body** | Mandatory, contains call/response data |
| **Fault** | Optional, carries error info |
| **WSDL** | Web Service Description Language — contract |
| **Transport** | Usually HTTP, but protocol agnostic |

---

## SOAP vs REST

```mermaid
graph LR
    subgraph SOAP
        S1[Envelope XML]
        S2[Strict WSDL contract]
        S3[Stateful allowed]
        S4[WS-* standards]
        S5[Heavier / slower]
    end

    subgraph REST
        R1[JSON / XML / plain]
        R2[No formal contract]
        R3[Stateless]
        R4[Uses HTTP verbs]
        R5[Lightweight / fast]
    end

    S1 -.->|both use HTTP| R1
```

| Aspect | SOAP | REST |
|--------|------|------|
| **Protocol** | Protocol (strict spec) | Architectural style |
| **Message format** | XML only | JSON, XML, plain text, etc. |
| **Contract** | WSDL (strict) | OpenAPI / Swagger (optional) |
| **State** | Supports stateful ops | Stateless by design |
| **Transport** | HTTP, SMTP, JMS, TCP | HTTP / HTTPS only |
| **Security** | WS-Security (built-in) | HTTPS + tokens (JWT, OAuth) |
| **Performance** | Heavier (XML parsing) | Lighter (JSON, less overhead) |
| **Caching** | Not built-in | HTTP caching (GET) |
| **Discovery** | WSDL / UDDI | URLs / docs |
| **Error handling** | SOAP Fault (structured) | HTTP status codes |
| **Best for** | Enterprise, banking, telecom | Public APIs, mobile, web apps |

```mermaid
blockquote
    SOAP = rigid contract, lots of XML, built-in security, enterprise-grade.
    REST = flexible, lightweight, stateless, great for modern web/mobile APIs.
    Neither is "better" — pick based on your use case.
```


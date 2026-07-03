# SOAP Full Lab — Real-World SOAP Project

![Version](https://img.shields.io/badge/version-2.1.0-blue)
![Node](https://img.shields.io/badge/node->=14.0.0-brightgreen)
![License](https://img.shields.io/badge/license-MIT-success)

A **complete, production-ready SOAP web service** with modern tooling, responsive UI, and comprehensive documentation. Demonstrates real-world SOAP patterns, WS-Security, REST API integration, and live XML inspection.

## ✨ Features

- **Full CRUD Bookstore Service** — Add, get, list, update, delete, search books via SOAP
- **Auto-Generated WSDL** — Standards-compliant WSDL descriptor at `/bookstore?wsdl`
- **SOAP + REST** — Same operations available as XML (SOAP) or JSON (REST)
- **WS-Security Support** — UsernameToken authentication in SOAP headers
- **Calculator Proxy** — Calls a real public SOAP service transparently
- **Live XML Inspector** — Captures and displays every SOAP message in real-time
- **Responsive UI** — Mobile, tablet, and desktop optimized interface
- **Modern Tooling** — ESLint, Prettier, Nodemon, Environment variables
- **Developer-Friendly** — Clear code structure, comprehensive comments

## 🚀 Quick Start

### Prerequisites

- **Node.js** 14.0.0 or higher
- **npm** 6.0.0 or higher

### Installation

```bash
# Clone or download the project
cd p2_full_theory_complete_real

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Start the server
npm start
```

The server runs on **http://localhost:4000** by default.

### Development Mode

```bash
# Run with auto-reload (requires nodemon)
npm run dev

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code with Prettier
npm run format

# Check formatting
npm run format:check
```

## 📋 API Endpoints

### SOAP Service

| Endpoint          | Method | Description                                |
| ----------------- | ------ | ------------------------------------------ |
| `/bookstore`      | `POST` | SOAP service endpoint (send SOAP Envelope) |
| `/bookstore?wsdl` | `GET`  | WSDL service descriptor                    |

### REST API (Alternative)

| Endpoint            | Method   | Description                  |
| ------------------- | -------- | ---------------------------- |
| `/api/books`        | `GET`    | List all books               |
| `/api/books/:id`    | `GET`    | Get a single book            |
| `/api/books`        | `POST`   | Add a new book               |
| `/api/books/:id`    | `PUT`    | Update a book                |
| `/api/books/:id`    | `DELETE` | Delete a book                |
| `/api/books/search` | `GET`    | Search books by title/author |

### Calculator Proxy

| Endpoint      | Method | Description                             |
| ------------- | ------ | --------------------------------------- |
| `/calculator` | `POST` | Proxy to public calculator SOAP service |

## 📚 SOAP Message Examples

### List Books Request

```xml
<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
  xmlns:book="http://example.com/bookstore">
  <soap:Body>
    <book:listBooks/>
  </soap:Body>
</soap:Envelope>
```

### Add Book Request (with Security)

```xml
<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
  xmlns:book="http://example.com/bookstore">
  <soap:Header>
    <wsse:UsernameToken xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">
      <wsse:Username>admin</wsse:Username>
      <wsse:Password>secret123</wsse:Password>
    </wsse:UsernameToken>
  </soap:Header>
  <soap:Body>
    <book:addBook>
      <title>The Great Gatsby</title>
      <author>F. Scott Fitzgerald</author>
      <year>1925</year>
    </book:addBook>
  </soap:Body>
</soap:Envelope>
```

## 🏗 Project Structure

```
p2_full_theory_complete_real/
├── server.js                    # Express + SOAP service
├── package.json                 # Dependencies & scripts
├── .eslintrc.json              # ESLint configuration
├── .prettierrc                  # Code formatting rules
├── .env.example                 # Environment template
├── .gitignore                   # Git exclusions
├── README.md                    # This file
└── public/
    ├── index.html              # Main UI page
    ├── style.css               # Responsive styles (mobile-first)
    └── app.js                  # Client-side logic
```

## 🎨 UI Sections

### 1. **Dashboard**

Overview of the service, quick statistics, and message flow diagram.

### 2. **Bookstore**

- List all books
- Add, search, update, delete books via SOAP
- View raw XML requests/responses
- Real-time book count

### 3. **Calculator**

- Call public SOAP service
- View request/response XML side-by-side
- Perform add, subtract, multiply, divide

### 4. **Security**

- Create UsernameToken headers
- Send authenticated SOAP requests
- View security token XML

### 5. **Inspector**

- Live-feed of all SOAP messages
- Filter by type (request/response/error)
- Auto-scroll and manual clearing
- Timestamp tracking

## 📱 Responsive Design

The UI is **mobile-first** and optimized for:

| Device  | Breakpoint    | Layout                         |
| ------- | ------------- | ------------------------------ |
| Mobile  | < 480px       | Single column, stacked sidebar |
| Tablet  | 480px - 768px | 2-column grid, horizontal nav  |
| Desktop | >= 768px      | Multi-column, vertical sidebar |

Key responsive features:

- Flexible navigation (horizontal on mobile, vertical on desktop)
- Adaptive book grid (1 → 2 → 4 columns)
- Responsive forms and inputs
- Touch-friendly button sizing
- Readable font sizes at all scales

## 🔒 WS-Security (Username Token)

The service supports SOAP UsernameToken authentication:

```javascript
// Default credentials (from .env):
// Username: admin
// Password: secret123
```

### How to Use

1. Open the **Security** tab
2. Enter username and password
3. Click "Add Book with Security"
4. Inspect the SOAP Header in the Inspector

The token is base64-encoded and validated on the server.

## ⚙️ Configuration

Edit `.env` (copied from `.env.example`):

```env
PORT=4000                      # Server port
HOST=localhost                 # Server host
NODE_ENV=development           # dev/production
SOAP_BASE_URL=http://localhost:4000
ENABLE_WSDL=true              # Generate WSDL
ENABLE_WS_SECURITY=true       # Allow authenticated requests
LOG_LEVEL=info                # Log verbosity
```

## 🔧 Code Quality

### ESLint

Enforces consistent code style (Airbnb base config):

```bash
npm run lint
npm run lint:fix
```

**Rules include:**

- No unused variables
- Consistent naming
- Proper async/await usage
- No console in production

### Prettier

Auto-formats code for consistency:

```bash
npm run format
npm run format:check
```

**Settings:**

- 2-space indentation
- Single quotes
- Trailing commas
- 100-character line width

## 📖 Learning Resources

This project demonstrates:

- **SOAP Protocol** — XML envelopes, headers, body
- **WSDL** — Service definition generation
- **WS-Security** — Token-based authentication
- **XML Parsing** — Client-side XML DOM manipulation
- **HTTP POST** — Raw XML requests/responses
- **REST Integration** — JSON APIs alongside SOAP
- **Express.js** — Node.js web server framework
- **Responsive CSS** — Mobile-first design patterns
- **Error Handling** — SOAP faults and validation
- **Real-time Updates** — Live message inspection

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Change PORT in .env or use:
PORT=5000 npm start
```

### Module Not Found

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### CORS Issues

If calling from different domain, enable CORS in `.env`:

```env
ENABLE_CORS=true
CORS_ORIGIN=*
```

### Linting Errors

```bash
# Auto-fix most issues:
npm run lint:fix
```

## 📚 Useful Links

- [SOAP 1.2 Specification](https://www.w3.org/TR/soap12-part1/)
- [WSDL 1.1 Reference](https://www.w3.org/TR/wsdl)
- [WS-Security Overview](https://docs.oasis-open.org/wss/v1.1/wss-v1.1-spec-os.pdf)
- [Node-SOAP Documentation](https://github.com/vpulim/node-soap)
- [Express.js Guide](https://expressjs.com/)
- [Responsive Web Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)

## 📝 License

MIT License — Feel free to use, modify, and distribute.

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 💡 Future Enhancements

- [ ] Unit tests with Jest
- [ ] Integration tests with Supertest
- [ ] Docker containerization
- [ ] Database persistence (MongoDB/PostgreSQL)
- [ ] API rate limiting
- [ ] Request/response caching
- [ ] GraphQL alternative endpoint
- [ ] Deployment guide (Heroku/Railway/Render)
- [ ] WebSocket support for real-time updates
- [ ] OpenAPI/Swagger documentation

## 📞 Support

For questions or issues:

1. Check the **Troubleshooting** section above
2. Review code comments in `server.js` and `app.js`
3. Inspect browser console for JavaScript errors
4. Check server logs for backend errors
5. Open an issue with details about your problem

---

**Made with ❤️ for learning SOAP, REST, and modern web development.**

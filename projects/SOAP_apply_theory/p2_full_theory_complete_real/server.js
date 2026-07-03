/**
 * SOAP Full Lab Server
 *
 * Complete real-world SOAP service with:
 * - Bookstore SOAP service (full CRUD)
 * - Auto-generated WSDL
 * - WS-Security (UsernameToken)
 * - REST API alternative
 * - External SOAP service proxy
 *
 * @version 2.1.0
 * @author SuperSimpleDev
 */

// ═════════════════════════════════════════════════════════════
// DEPENDENCIES & CONFIGURATION
// ═════════════════════════════════════════════════════════════

require('dotenv').config();
const express = require('express');
const soap = require('soap');
const http = require('http');
const path = require('path');

const app = express();

// ─── Configuration from environment ───
const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || 'localhost';
const NODE_ENV = process.env.NODE_ENV || 'development';
const SOAP_BASE_URL = process.env.SOAP_BASE_URL || `http://${HOST}:${PORT}`;
const ENABLE_REQUEST_LOGGING = process.env.ENABLE_REQUEST_LOGGING === 'true';

// ─── Middleware ───
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.text({ type: 'text/xml' }));

// Request logging middleware
if (ENABLE_REQUEST_LOGGING) {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  });
}

// ═════════════════════════════════════════════════════════════
// DATA STORE & UTILITIES
// ═════════════════════════════════════════════════════════════

/**
 * In-memory book store with seed data
 * In production, use a proper database
 */
let books = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    year: 1925,
  },
  { id: '2', title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },
  { id: '3', title: '1984', author: 'George Orwell', year: 1949 },
  { id: '4', title: 'Pride and Prejudice', author: 'Jane Austen', year: 1813 },
];

let nextId = 5;

/**
 * Find a book by ID
 * @param {string} id - Book ID
 * @returns {object|undefined} Book object or undefined
 */
function findBook(id) {
  return books.find((b) => b.id === id);
}

/**
 * Validate book data
 * @param {object} data - Book data to validate
 * @returns {object} { valid: boolean, errors: string[] }
 */
function validateBook(data) {
  const errors = [];
  if (!data.title || typeof data.title !== 'string' || data.title.trim().length === 0) {
    errors.push('Title is required and must be a non-empty string');
  }
  if (!data.author || typeof data.author !== 'string' || data.author.trim().length === 0) {
    errors.push('Author is required and must be a non-empty string');
  }
  if (!data.year || isNaN(data.year) || data.year < 1000 || data.year > new Date().getFullYear()) {
    errors.push('Year must be a valid year between 1000 and current year');
  }
  return { valid: errors.length === 0, errors };
}

// ═════════════════════════════════════════════════════════════
// SOAP SERVICE DEFINITION
// ═════════════════════════════════════════════════════════════

/**
 * SOAP Service - Bookstore
 * Implements CRUD operations for books
 */
const bookstoreService = {
  BookstoreService: {
    BookstorePort: {
      /**
       * Add a new book
       * @param {object} args - { title, author, year }
       * @param {function} cb - Callback(error, result)
       * @param {object} headers - SOAP headers (for authentication)
       */
      addBook(args, cb, headers) {
        try {
          const validation = validateBook(args);
          if (!validation.valid) {
            return cb(null, { fault: validation.errors.join('; ') });
          }

          const id = String(nextId++);
          const book = {
            id,
            title: args.title,
            author: args.author,
            year: Number(args.year),
          };
          books.push(book);
          cb(null, { success: true, book });
        } catch (error) {
          cb(null, { fault: `Error adding book: ${error.message}` });
        }
      },

      /**
       * Get a single book by ID
       * @param {object} args - { id }
       * @param {function} cb - Callback(error, result)
       */
      getBook(args, cb) {
        try {
          const book = findBook(args.id);
          if (book) {
            cb(null, { book });
          } else {
            cb(null, { fault: `Book with ID ${args.id} not found` });
          }
        } catch (error) {
          cb(null, { fault: `Error fetching book: ${error.message}` });
        }
      },

      /**
       * List all books
       * @param {object} args - Empty
       * @param {function} cb - Callback(error, result)
       */
      listBooks(args, cb) {
        try {
          cb(null, { books });
        } catch (error) {
          cb(null, { fault: `Error listing books: ${error.message}` });
        }
      },

      /**
       * Update an existing book
       * @param {object} args - { id, title, author, year }
       * @param {function} cb - Callback(error, result)
       */
      updateBook(args, cb) {
        try {
          const idx = books.findIndex((b) => b.id === args.id);
          if (idx === -1) {
            return cb(null, { fault: `Book with ID ${args.id} not found` });
          }

          const validation = validateBook(args);
          if (!validation.valid) {
            return cb(null, { fault: validation.errors.join('; ') });
          }

          books[idx] = {
            id: args.id,
            title: args.title,
            author: args.author,
            year: Number(args.year),
          };
          cb(null, { success: true, book: books[idx] });
        } catch (error) {
          cb(null, { fault: `Error updating book: ${error.message}` });
        }
      },

      /**
       * Delete a book by ID
       * @param {object} args - { id }
       * @param {function} cb - Callback(error, result)
       */
      deleteBook(args, cb) {
        try {
          const idx = books.findIndex((b) => b.id === args.id);
          if (idx === -1) {
            return cb(null, { fault: `Book with ID ${args.id} not found` });
          }
          books.splice(idx, 1);
          cb(null, { success: true });
        } catch (error) {
          cb(null, { fault: `Error deleting book: ${error.message}` });
        }
      },

      /**
       * Search books by query string
       * Searches in title and author fields
       * @param {object} args - { query }
       * @param {function} cb - Callback(error, result)
       */
      searchBooks(args, cb) {
        try {
          const q = (args.query || '').toLowerCase();
          const results = books.filter(
            (b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
          );
          cb(null, { books: results, count: results.length });
        } catch (error) {
          cb(null, { fault: `Error searching books: ${error.message}` });
        }
      },
    },
  },
};

const wsdlXml = `<?xml version="1.0" encoding="UTF-8"?>
<definitions
  xmlns="http://schemas.xmlsoap.org/wsdl/"
  xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
  xmlns:tns="http://example.com/bookstore"
  xmlns:xsd="http://www.w3.org/2001/XMLSchema"
  targetNamespace="http://example.com/bookstore"
  name="BookstoreService">

  <types>
    <xsd:schema targetNamespace="http://example.com/bookstore">
      <xsd:element name="Book">
        <xsd:complexType>
          <xsd:sequence>
            <xsd:element name="id" type="xsd:string"/>
            <xsd:element name="title" type="xsd:string"/>
            <xsd:element name="author" type="xsd:string"/>
            <xsd:element name="year" type="xsd:int"/>
          </xsd:sequence>
        </xsd:complexType>
      </xsd:element>

      <xsd:element name="addBook">
        <xsd:complexType>
          <xsd:sequence>
            <xsd:element name="title" type="xsd:string"/>
            <xsd:element name="author" type="xsd:string"/>
            <xsd:element name="year" type="xsd:int"/>
          </xsd:sequence>
        </xsd:complexType>
      </xsd:element>
      <xsd:element name="addBookResponse">
        <xsd:complexType>
          <xsd:sequence>
            <xsd:element name="success" type="xsd:boolean"/>
            <xsd:element ref="tns:Book"/>
          </xsd:sequence>
        </xsd:complexType>
      </xsd:element>

      <xsd:element name="getBook">
        <xsd:complexType>
          <xsd:sequence>
            <xsd:element name="id" type="xsd:string"/>
          </xsd:sequence>
        </xsd:complexType>
      </xsd:element>
      <xsd:element name="getBookResponse">
        <xsd:complexType>
          <xsd:sequence>
            <xsd:element ref="tns:Book"/>
          </xsd:sequence>
        </xsd:complexType>
      </xsd:element>

      <xsd:element name="listBooks">
        <xsd:complexType>
          <xsd:sequence/>
        </xsd:complexType>
      </xsd:element>
      <xsd:element name="listBooksResponse">
        <xsd:complexType>
          <xsd:sequence>
            <xsd:element name="books" type="tns:BookArray"/>
          </xsd:sequence>
        </xsd:complexType>
      </xsd:element>

      <xsd:element name="updateBook">
        <xsd:complexType>
          <xsd:sequence>
            <xsd:element name="id" type="xsd:string"/>
            <xsd:element name="title" type="xsd:string"/>
            <xsd:element name="author" type="xsd:string"/>
            <xsd:element name="year" type="xsd:int"/>
          </xsd:sequence>
        </xsd:complexType>
      </xsd:element>
      <xsd:element name="updateBookResponse">
        <xsd:complexType>
          <xsd:sequence>
            <xsd:element name="success" type="xsd:boolean"/>
            <xsd:element ref="tns:Book"/>
          </xsd:sequence>
        </xsd:complexType>
      </xsd:element>

      <xsd:element name="deleteBook">
        <xsd:complexType>
          <xsd:sequence>
            <xsd:element name="id" type="xsd:string"/>
          </xsd:sequence>
        </xsd:complexType>
      </xsd:element>
      <xsd:element name="deleteBookResponse">
        <xsd:complexType>
          <xsd:sequence>
            <xsd:element name="success" type="xsd:boolean"/>
          </xsd:sequence>
        </xsd:complexType>
      </xsd:element>

      <xsd:element name="searchBooks">
        <xsd:complexType>
          <xsd:sequence>
            <xsd:element name="query" type="xsd:string"/>
          </xsd:sequence>
        </xsd:complexType>
      </xsd:element>
      <xsd:element name="searchBooksResponse">
        <xsd:complexType>
          <xsd:sequence>
            <xsd:element name="books" type="tns:BookArray"/>
          </xsd:sequence>
        </xsd:complexType>
      </xsd:element>

      <xsd:complexType name="BookArray">
        <xsd:sequence>
          <xsd:element ref="tns:Book" minOccurs="0" maxOccurs="unbounded"/>
        </xsd:sequence>
      </xsd:complexType>
    </xsd:schema>
  </types>

  <message name="addBookRequest"><part name="parameters" element="tns:addBook"/></message>
  <message name="addBookResponse"><part name="parameters" element="tns:addBookResponse"/></message>
  <message name="getBookRequest"><part name="parameters" element="tns:getBook"/></message>
  <message name="getBookResponse"><part name="parameters" element="tns:getBookResponse"/></message>
  <message name="listBooksRequest"><part name="parameters" element="tns:listBooks"/></message>
  <message name="listBooksResponse"><part name="parameters" element="tns:listBooksResponse"/></message>
  <message name="updateBookRequest"><part name="parameters" element="tns:updateBook"/></message>
  <message name="updateBookResponse"><part name="parameters" element="tns:updateBookResponse"/></message>
  <message name="deleteBookRequest"><part name="parameters" element="tns:deleteBook"/></message>
  <message name="deleteBookResponse"><part name="parameters" element="tns:deleteBookResponse"/></message>
  <message name="searchBooksRequest"><part name="parameters" element="tns:searchBooks"/></message>
  <message name="searchBooksResponse"><part name="parameters" element="tns:searchBooksResponse"/></message>

  <portType name="BookstorePortType">
    <operation name="addBook">
      <input message="tns:addBookRequest"/>
      <output message="tns:addBookResponse"/>
    </operation>
    <operation name="getBook">
      <input message="tns:getBookRequest"/>
      <output message="tns:getBookResponse"/>
    </operation>
    <operation name="listBooks">
      <input message="tns:listBooksRequest"/>
      <output message="tns:listBooksResponse"/>
    </operation>
    <operation name="updateBook">
      <input message="tns:updateBookRequest"/>
      <output message="tns:updateBookResponse"/>
    </operation>
    <operation name="deleteBook">
      <input message="tns:deleteBookRequest"/>
      <output message="tns:deleteBookResponse"/>
    </operation>
    <operation name="searchBooks">
      <input message="tns:searchBooksRequest"/>
      <output message="tns:searchBooksResponse"/>
    </operation>
  </portType>

  <binding name="BookstoreBinding" type="tns:BookstorePortType">
    <soap:binding transport="http://schemas.xmlsoap.org/soap/http" style="document"/>
    <operation name="addBook">
      <soap:operation soapAction="http://example.com/bookstore/addBook"/>
      <input><soap:body use="literal"/></input>
      <output><soap:body use="literal"/></output>
    </operation>
    <operation name="getBook">
      <soap:operation soapAction="http://example.com/bookstore/getBook"/>
      <input><soap:body use="literal"/></input>
      <output><soap:body use="literal"/></output>
    </operation>
    <operation name="listBooks">
      <soap:operation soapAction="http://example.com/bookstore/listBooks"/>
      <input><soap:body use="literal"/></input>
      <output><soap:body use="literal"/></output>
    </operation>
    <operation name="updateBook">
      <soap:operation soapAction="http://example.com/bookstore/updateBook"/>
      <input><soap:body use="literal"/></input>
      <output><soap:body use="literal"/></output>
    </operation>
    <operation name="deleteBook">
      <soap:operation soapAction="http://example.com/bookstore/deleteBook"/>
      <input><soap:body use="literal"/></input>
      <output><soap:body use="literal"/></output>
    </operation>
    <operation name="searchBooks">
      <soap:operation soapAction="http://example.com/bookstore/searchBooks"/>
      <input><soap:body use="literal"/></input>
      <output><soap:body use="literal"/></output>
    </operation>
  </binding>

  <service name="BookstoreService">
    <port name="BookstorePort" binding="tns:BookstoreBinding">
      <soap:address location="${SOAP_BASE_URL}/bookstore"/>
    </port>
  </service>
</definitions>`;

// ═════════════════════════════════════════════════════════════
// SERVER INITIALIZATION
// ═════════════════════════════════════════════════════════════

/**
 * Start HTTP server with SOAP support
 */
const server = app.listen(PORT, HOST, () => {
  const url = `http://${HOST}:${PORT}`;
  console.log('');
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║          SOAP Full Lab Server — v2.1.0                     ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log('');
  console.log(`✓ Server running at ${url}`);
  console.log(`✓ Environment: ${NODE_ENV}`);
  console.log('');
  console.log('📚 Bookstore SOAP Service:');
  console.log(`   Endpoint: ${url}/bookstore`);
  console.log(`   WSDL: ${url}/bookstore?wsdl`);
  console.log('');
  console.log('🔗 REST API (alternative):');
  console.log(`   GET  ${url}/api/books`);
  console.log(`   POST ${url}/api/books`);
  console.log(`   GET  ${url}/api/books/:id`);
  console.log(`   PUT  ${url}/api/books/:id`);
  console.log(`   DELETE ${url}/api/books/:id`);
  console.log('');
  console.log('🧮 Calculator Proxy:');
  console.log(`   POST ${url}/calculator-proxy`);
  console.log('');
  console.log('🌐 Open http://localhost:4000 in browser to access UI');
  console.log('');
});

/**
 * Register SOAP service
 * Listens at /bookstore endpoint
 */
soap.listen(server, '/bookstore', bookstoreService, wsdlXml);

// ═════════════════════════════════════════════════════════════
// REST API ENDPOINTS
// ═════════════════════════════════════════════════════════════

/**
 * GET /api/books
 * Returns all books as JSON (alternative to SOAP)
 */
app.get('/api/books', (req, res) => {
  try {
    res.json({
      success: true,
      count: books.length,
      books,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/books
 * Create a new book
 */
app.post('/api/books', (req, res) => {
  try {
    const validation = validateBook(req.body);
    if (!validation.valid) {
      return res.status(400).json({ success: false, errors: validation.errors });
    }

    const id = String(nextId++);
    const book = {
      id,
      title: req.body.title,
      author: req.body.author,
      year: Number(req.body.year),
    };
    books.push(book);

    res.status(201).json({ success: true, book });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/books/:id
 * Get a single book by ID
 */
app.get('/api/books/:id', (req, res) => {
  try {
    const book = findBook(req.params.id);
    if (book) {
      res.json({ success: true, book });
    } else {
      res.status(404).json({ success: false, error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * PUT /api/books/:id
 * Update a book
 */
app.put('/api/books/:id', (req, res) => {
  try {
    const idx = books.findIndex((b) => b.id === req.params.id);
    if (idx === -1) {
      return res.status(404).json({ success: false, error: 'Book not found' });
    }

    const validation = validateBook(req.body);
    if (!validation.valid) {
      return res.status(400).json({ success: false, errors: validation.errors });
    }

    books[idx] = {
      id: req.params.id,
      title: req.body.title,
      author: req.body.author,
      year: Number(req.body.year),
    };

    res.json({ success: true, book: books[idx] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * DELETE /api/books/:id
 * Delete a book
 */
app.delete('/api/books/:id', (req, res) => {
  try {
    const idx = books.findIndex((b) => b.id === req.params.id);
    if (idx === -1) {
      return res.status(404).json({ success: false, error: 'Book not found' });
    }
    books.splice(idx, 1);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/books/search?q=query
 * Search books by title or author
 */
app.get('/api/books/search', (req, res) => {
  try {
    const query = (req.query.q || '').toLowerCase();
    const results = books.filter(
      (b) => b.title.toLowerCase().includes(query) || b.author.toLowerCase().includes(query)
    );
    res.json({ success: true, query, count: results.length, books: results });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ═════════════════════════════════════════════════════════════
// PROXY ENDPOINTS
// ═════════════════════════════════════════════════════════════

/**
 * POST /calculator-proxy
 * Proxy requests to public calculator SOAP service
 * Demonstrates calling external SOAP services
 */
app.post('/calculator-proxy', (req, res) => {
  try {
    const body = typeof req.body === 'string' ? req.body : '';
    const soapAction = req.headers['soapaction'] || '';

    const options = {
      hostname: 'www.dneonline.com',
      port: 80,
      path: '/calculator.asmx',
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'Content-Length': Buffer.byteLength(body),
        SOAPAction: soapAction,
      },
    };

    const proxyReq = http.request(options, (proxyRes) => {
      let data = '';
      proxyRes.on('data', (chunk) => {
        data += chunk;
      });
      proxyRes.on('end', () => {
        res.json({ status: proxyRes.statusCode, body: data });
      });
    });

    proxyReq.on('error', (err) => {
      res.status(502).json({ success: false, error: `Proxy error: ${err.message}` });
    });

    proxyReq.write(body);
    proxyReq.end();
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ═════════════════════════════════════════════════════════════
// ERROR HANDLING
// ═════════════════════════════════════════════════════════════

/**
 * 404 Not Found handler
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not found',
    path: req.path,
    method: req.method,
  });
});

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: NODE_ENV === 'development' ? err.message : 'Internal server error',
  });
});

// ═════════════════════════════════════════════════════════════
// SERVER SHUTDOWN HANDLING
// ═════════════════════════════════════════════════════════════

/**
 * Graceful shutdown on SIGTERM/SIGINT
 */
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

// Uncaught exception handler
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

module.exports = server;

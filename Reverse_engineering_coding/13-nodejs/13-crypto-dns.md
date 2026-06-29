# Crypto and DNS

<img src="https://media.giphy.com/media/V4NSR1NG2p0KeJJyr5/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Hashing

```javascript
const crypto = require('crypto');

// Create a hash
const hash = crypto.createHash('sha256');
hash.update('Hello World');
console.log(hash.digest('hex'));
// 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e'

// Streaming hashing
const hashStream = crypto.createHash('sha256');

fs.createReadStream('file.txt')
    .pipe(hashStream)
    .on('finish', () => {
        console.log(hashStream.digest('hex'));
    });
```

## HMAC (Hash-based Message Authentication Code)

```javascript
const crypto = require('crypto');

const hmac = crypto.createHmac('sha256', 'secret-key');
hmac.update('message');
console.log(hmac.digest('hex'));
// Different from plain hash — requires key
```

## Random Bytes

```javascript
crypto.randomBytes(32, (err, buffer) => {
    if (err) throw err;
    console.log(buffer.toString('hex'));
    // 32 random bytes → 64 hex characters
});

// Synchronous (blocks)
const buf = crypto.randomBytes(32);
```

## Password Hashing (PBKDF2)

```javascript
const crypto = require('crypto');

const password = 'user-password';
const salt = crypto.randomBytes(16).toString('hex');

// PBKDF2: computationally expensive (key stretching)
crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, key) => {
    if (err) throw err;
    console.log(key.toString('hex')); // Hashed password
    // Store salt + hashed password in database
});
```

## Encryption / Decryption

```javascript
const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

// Encrypt
const cipher = crypto.createCipheriv(algorithm, key, iv);
let encrypted = cipher.update('Secret message', 'utf8', 'hex');
encrypted += cipher.final('hex');
console.log('Encrypted:', encrypted);

// Decrypt
const decipher = crypto.createDecipheriv(algorithm, key, iv);
let decrypted = decipher.update(encrypted, 'hex', 'utf8');
decrypted += decipher.final('utf8');
console.log('Decrypted:', decrypted);
```

---

## DNS

```javascript
const dns = require('dns');

// Lookup (uses thread pool)
dns.lookup('google.com', (err, address, family) => {
    console.log(address); // '142.250.80.46'
    console.log(family);  // 4 (IPv4)
});

// Resolve (uses network directly, not thread pool)
dns.resolve('google.com', 'A', (err, addresses) => {
    console.log(addresses); // ['142.250.80.46', ...]
});

// Reverse lookup
dns.reverse('8.8.8.8', (err, hostnames) => {
    console.log(hostnames); // ['dns.google']
});
```

Difference: `dns.lookup()` goes through libuv thread pool (like OS `getaddrinfo`). `dns.resolve()` uses Node's DNS implementation directly.

---

## Q&A

| Question | Answer |
|----------|--------|
| Is data being hashed or encrypted? | Hash: one-way. Encrypt: reversible with key |
| Is password being stored securely? | Use PBKDF2, bcrypt, or argon2 — never plain SHA |
| Are random values truly random? | `crypto.randomBytes` is cryptographically secure |
## Next Steps

[Back to Chapter 12](12-event-emitter-os.md): Event Emitter and OS Module
[Proceed to Chapter 14](14-memory-stdio-signals.md): Memory, STDIO, and Signals to learn about memory, stdio, and signals.

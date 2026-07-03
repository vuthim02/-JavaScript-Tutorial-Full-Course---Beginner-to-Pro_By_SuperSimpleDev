# 15. File Uploads and Pagination

## File Uploads

### Multipart Form Data

```html
<form action="/upload" method="POST" enctype="multipart/form-data">
    <input type="file" name="avatar" />
    <input type="text" name="username" />
    <button type="submit">Upload</button>
</form>
```

### Server Handling with Multer

```javascript
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowed = ['image/jpeg', 'image/png', 'image/gif'];
        if (allowed.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only JPEG, PNG, and GIF allowed'), false);
        }
    }
});

app.post('/upload', upload.single('avatar'), (req, res) => {
    res.json({ message: 'Uploaded', filename: req.file.filename, size: req.file.size });
});

app.post('/upload-multiple', upload.array('photos', 10), (req, res) => {
    res.json({ files: req.files.map(f => f.filename) });
});
```

### Streaming Uploads (Without Multer)

```javascript
const { Writable } = require('stream');
const fs = require('fs');

app.post('/upload-stream', (req, res) => {
    const filename = `upload-${Date.now()}`;
    const writeStream = fs.createWriteStream(`uploads/${filename}`);
    req.pipe(writeStream);
    req.on('end', () => res.json({ message: 'Uploaded', filename }));
    req.on('error', (err) => res.status(500).json({ error: 'Upload failed' }));
});
```

## Pagination

### Offset-Based

```javascript
// GET /api/users?page=2&limit=20
app.get('/api/users', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    const results = db.users.slice(offset, offset + limit);
    res.json({
        data: results,
        pagination: {
            page, limit,
            total: db.users.length,
            totalPages: Math.ceil(db.users.length / limit),
            hasNext: offset + limit < db.users.length,
            hasPrev: page > 1
        }
    });
});
```

### Cursor-Based

Better for real-time data where new items are inserted.

```javascript
// GET /api/users?cursor=eyJpZCI6MTAwfQ&limit=20
app.get('/api/users', (req, res) => {
    const limit = parseInt(req.query.limit) || 20;
    const cursor = req.query.cursor
        ? JSON.parse(Buffer.from(req.query.cursor, 'base64').toString())
        : null;
    let query = db.users.sort((a, b) => a.id - b.id);
    if (cursor) query = query.filter(u => u.id > cursor.id);
    const results = query.slice(0, limit + 1);
    const hasNext = results.length > limit;
    const data = hasNext ? results.slice(0, limit) : results;
    const nextCursor = hasNext
        ? Buffer.from(JSON.stringify({ id: data[data.length - 1].id })).toString('base64')
        : null;
    res.json({ data, pagination: { nextCursor, hasNext } });
});
```

### Offset vs Cursor

| Feature | Offset | Cursor |
|---------|--------|--------|
| Page jumps | Yes | No |
| Real-time inserts | Duplicates/shifts | Stable |
| Large offset performance | Slow (OFFSET 100000) | Fast (WHERE id > cursor) |

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is pagination needed? | Yes if dataset > 100 items |
| Offset or cursor? | Offset for simple data. Cursor for real-time/large data |
## Next Steps

[Back to Chapter 14](14-graphql.md): 14. GraphQL — Query Language for APIs
[Proceed to Chapter 16](16-rate-limiting.md): 16. Rate Limiting — Protecting APIs from Abuse to learn about 16. rate limiting — protecting apis from abuse.

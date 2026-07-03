# Chapter 10 — CORS

## CORS Middleware

```javascript
const cors = require('cors');

// Allow all (development only)
app.use(cors());

// Specific origin
app.use(cors({
    origin: 'https://myapp.com',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400
}));

// Multiple origins
const allowedOrigins = ['https://app1.com', 'https://app2.com'];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// Per-route CORS
app.get('/api/public', cors(), (req, res) => {
    res.json({ message: 'Public data' });
});

app.get('/api/private', cors({
    origin: 'https://myapp.com'
}), (req, res) => {
    res.json({ message: 'Private data' });
});
```

# Chapter 11 — File Uploads with Multer

## Setup

```javascript
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, uniqueSuffix + ext);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new AppError('Only JPEG, PNG, GIF, and WebP images are allowed', 400), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 5
    }
});
```

## Routes

```javascript
// Single file
app.post('/upload/avatar',
    authenticate,
    upload.single('avatar'),
    (req, res) => {
        res.json({
            data: {
                filename: req.file.filename,
                size: req.file.size,
                url: `/uploads/${req.file.filename}`
            }
        });
    }
);

// Multiple files
app.post('/upload/photos',
    authenticate,
    upload.array('photos', 10),
    (req, res) => {
        const files = req.files.map(f => ({
            filename: f.filename,
            url: `/uploads/${f.filename}`
        }));
        res.json({ data: files });
    }
);

// Multiple fields
app.post('/upload/profile',
    authenticate,
    upload.fields([
        { name: 'avatar', maxCount: 1 },
        { name: 'gallery', maxCount: 5 }
    ]),
    (req, res) => {
        res.json({ data: req.files });
    }
);
```

## Error Handling for Multer

```javascript
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                error: { code: 'FILE_TOO_LARGE', message: 'File exceeds 5 MB limit' }
            });
        }
        if (err.code === 'LIMIT_FILE_COUNT') {
            return res.status(400).json({
                error: { code: 'TOO_MANY_FILES', message: 'Too many files' }
            });
        }
    }
    next(err);
});
```

## Cloud Storage (S3)

```javascript
const { S3Client } = require('@aws-sdk/client-s3');
const multerS3 = require('multer-s3');
const crypto = require('crypto');

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const upload = multer({
    storage: multerS3({
        s3,
        bucket: 'myapp-uploads',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, cb) => {
            const id = crypto.randomBytes(16).toString('hex');
            cb(null, `uploads/${id}${path.extname(file.originalname)}`);
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 }
});
```

## Reverse Engineering Questions

| Question | Answer |
|----------|--------|
| Is CORS configured? | Check for `cors()` middleware |
| Allowed origins? | Check `origin` option in CORS config |
| Are file uploads handled? | Check for `multer` usage |
| File size limit? | Check `limits.fileSize` in multer config |
| File type validation? | Check `fileFilter` function |
## Next Steps

[Back to Chapter 9](09-authorization.md): Chapter 9 — Authorization
[Proceed to Chapter 11](11-logging.md): Chapter 11 — Structured Logging to learn about chapter 11 — structured logging.

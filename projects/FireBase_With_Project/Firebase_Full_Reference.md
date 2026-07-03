# Firebase Complete Developer Reference

## 1. Authentication

```js
// Email & Password
await auth.createUserWithEmailAndPassword(email, password)
await auth.signInWithEmailAndPassword(email, password)
await auth.signOut()

// Google
const provider = new firebase.auth.GoogleAuthProvider()
await auth.signInWithPopup(provider)
await auth.signInWithRedirect(provider)
firebase.auth().getRedirectResult()

// Other providers
new firebase.auth.FacebookAuthProvider()
new firebase.auth.GithubAuthProvider()
new firebase.auth.TwitterAuthProvider()

// User management
const user = auth.currentUser
await user.updateProfile({ displayName, photoURL })
await user.updateEmail(newEmail)
await user.updatePassword(newPassword)
await user.sendEmailVerification()
await user.delete()
await auth.sendPasswordResetEmail(email)

// Auth State
auth.onAuthStateChanged(user => { ... })

// Phone Auth (requires Recaptcha)
const verifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')
const confResult = await auth.signInWithPhoneNumber(phone, verifier)
const cred = firebase.auth.PhoneAuthProvider.credential(confResult.verificationId, code)
await auth.signInWithCredential(cred)
```

---

## 2. Firestore (NoSQL Database)

### CRUD

```js
const db = firebase.firestore()

// CREATE
await db.collection('users').add({ name, email, createdAt: firebase.firestore.FieldValue.serverTimestamp() })

// READ (single)
const doc = await db.collection('users').doc('userId').get()
if (doc.exists) console.log(doc.data())

// READ (all)
const snapshot = await db.collection('users').get()
snapshot.forEach(doc => console.log(doc.id, doc.data()))

// UPDATE
await db.collection('users').doc('userId').update({ name: 'New Name' })

// DELETE
await db.collection('users').doc('userId').delete()

// SET (overwrite or merge)
await db.collection('users').doc('userId').set({ name: 'John' }, { merge: true })
```

### Queries

```js
db.collection('notes')
  .where('userId', '==', uid)
  .where('priority', '>=', 5)
  .orderBy('createdAt', 'desc')
  .limit(10)
  .get()

// Compound indexes needed for multiple where + orderBy
// Composite index: userId ASC, createdAt DESC
```

### Real-time Listener

```js
const unsubscribe = db.collection('notes')
  .where('userId', '==', uid)
  .orderBy('createdAt')
  .onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
      if (change.type === 'added') { /* add to UI */ }
      if (change.type === 'modified') { /* update UI */ }
      if (change.type === 'removed') { /* remove from UI */ }
    })
  })
// unsubscribe() to stop listening
```

### Subcollections

```js
// /users/{userId}/messages/{messageId}
await db.collection('users').doc(uid).collection('messages').add({ text })
```

### Batch Writes & Transactions

```js
// Batch (multiple writes atomically)
const batch = db.batch()
batch.set(docRef1, { name: 'Alice' })
batch.update(docRef2, { count: firebase.firestore.FieldValue.increment(1) })
batch.delete(docRef3)
await batch.commit()

// Transaction (read + write atomically)
await db.runTransaction(async transaction => {
  const doc = await transaction.get(counterRef)
  const newCount = doc.data().count + 1
  transaction.update(counterRef, { count: newCount })
})
```

### Field Values

```js
firebase.firestore.FieldValue.serverTimestamp()   // server time on write
firebase.firestore.FieldValue.increment(n)        // atomic increment
firebase.firestore.FieldValue.arrayUnion(item)    // add to array
firebase.firestore.FieldValue.arrayRemove(item)   // remove from array
firebase.firestore.FieldValue.delete()            // remove field
```

### Security Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /notes/{noteId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

---

## 3. Storage (File & Image Upload)

```js
const storage = firebase.storage()
const ref = storage.ref(`images/${uid}/${file.name}`)

// Upload
const task = ref.put(file)
task.on('state_changed',
  snapshot => { /* progress: snapshot.bytesTransferred / snapshot.totalBytes */ },
  error => { /* error */ },
  async () => {
    const url = await task.snapshot.ref.getDownloadURL()
    // save url to Firestore
  }
)

// Upload with metadata
const metadata = { contentType: 'image/jpeg', customMetadata: { userId: uid } }
await ref.put(file, metadata)

// Download URL
const url = await storage.ref('path/to/file').getDownloadURL()

// Delete
await storage.ref('path/to/file').delete()
await storage.refFromURL('https://...').delete()

// List files
const result = await storage.ref('images/').listAll()
result.items.forEach(itemRef => console.log(itemRef.name))
result.prefixes.forEach(folderRef => console.log(folderRef.name))

// Pause / Resume / Cancel
task.pause()
task.resume()
task.cancel()
```

### Security Rules

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /images/{userId}/{fileName} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## 4. Hosting

```bash
firebase init hosting       # set up
firebase deploy --only hosting  # deploy
firebase deploy             # deploy all
```

- Custom domains supported
- CDN caching
- Rewrites for SPA:

```json
{
  "hosting": {
    "public": "dist",
    "rewrites": [{ "source": "**", "destination": "/index.html" }]
  }
}
```

---

## 5. Realtime Database (Legacy — use Firestore for new projects)

```js
const rtdb = firebase.database()
await rtdb.ref('users/' + uid).set({ name, email })
rtdb.ref('users/' + uid).on('value', snapshot => { ... })
rtdb.ref('users/' + uid).off()
```

---

## 6. Cloud Functions (Backend Logic)

```js
// Firebase Cloud Functions (Node.js)
exports.createUserProfile = functions.auth.user().onCreate(user => {
  return admin.firestore().collection('users').doc(user.uid).set({
    name: user.displayName, email: user.email, createdAt: admin.firestore.FieldValue.serverTimestamp()
  })
})

// Callable functions
exports.addMessage = functions.https.onCall((data, context) => {
  if (!context.auth) throw new functions.https.HttpsError('unauthenticated', 'Must be logged in')
  return { result: `Hello ${data.name}` }
})

// Client call:
const result = await firebase.functions().httpsCallable('addMessage')({ name: 'Alice' })
```

---

## 7. Firebase Security Rules (All Services)

### Firestore
```yaml
match /{document=**} { allow read, write: if false; }  # deny all by default
match /posts/{postId} {
  allow read: if request.auth != null;
  allow create: if request.auth != null && request.auth.uid == request.resource.data.authorId;
  allow update, delete: if request.auth != null && request.auth.uid == resource.data.authorId;
}
```
- `request.auth` — authenticated user
- `resource.data` — existing document data
- `request.resource.data` — incoming data

### Storage
```yaml
match /user_uploads/{userId}/{file} {
  allow read: if request.auth != null;
  allow write: if request.auth != null && request.auth.uid == userId
    && request.resource.size < 5 * 1024 * 1024
    && request.resource.contentType.matches('image/.*');
}
```

---

## 8. Firebase Emulators (Local Development)

```bash
firebase init emulators
firebase emulators:start
```

Services available: Auth, Firestore, Storage, Functions, Hosting, Realtime DB, PubSub

Client config for emulator:
```js
connectAuthEmulator(auth, 'http://localhost:9099')
connectFirestoreEmulator(db, 'localhost', 8080)
connectStorageEmulator(storage, 'localhost', 9199)
```

---

## 9. Analytics

```js
const analytics = firebase.analytics()
analytics.logEvent('share_image', { image_name: name })
analytics.setUserProperties({ favorite_category: 'tech' })
```

---

## 10. Cloud Messaging (Push Notifications)

```js
const messaging = firebase.messaging()
await messaging.requestPermission()
const token = await messaging.getToken()
// send token to Firestore for targeting
messaging.onMessage(payload => { console.log('Foreground message:', payload) })
```

---

## 11. Remote Config (Feature Flags)

```js
const remoteConfig = firebase.remoteConfig()
remoteConfig.settings.minimumFetchIntervalMillis = 3600000
await remoteConfig.fetchAndActivate()
const value = remoteConfig.getValue('welcome_message')
console.log(value.asString())
```

---

## 12. Performance Monitoring

```js
const perf = firebase.performance()
const trace = perf.trace('image_upload')
trace.start()
// ... upload code ...
trace.stop()
```

---

## 13. App Check (Security)

```js
// reCAPTCHA v3
const appCheck = firebase.appCheck()
appCheck.activate('reCAPTCHA-site-key')
```

---

## 14. Best Practices

### Security
- Always validate userId on server/rules (never trust client)
- Use Security Rules as first line of defense
- Enable App Check for production apps
- Never expose Admin SDK keys on client

### Data Modeling
- Keep documents small (< 1MB)
- Use subcollections for hierarchical data
- Avoid deeply nested data (max 20 levels)
- Denormalize for read performance
- Create composite indexes for complex queries

### Performance
- Use `onSnapshot` sparingly — limit with `where` clauses
- Paginate with `limit` + `startAfter`
- Use `get` for one-time reads, `onSnapshot` for real-time
- Store image/video URLs in Firestore, files in Storage

### Cost Optimization
- Firestore: charged per read/write/delete
- Storage: charged per GB stored + bandwidth
- Use `select()` to only fetch needed fields
- Avoid listeners on large collections

## 15. Firebase CLI Quick Reference

```bash
firebase init                    # Init a service (hosting, firestore, etc.)
firebase login                   # Login to Google
firebase login --reauth          # Re-authenticate
firebase deploy                  # Deploy all
firebase deploy --only hosting   # Deploy only hosting
firebase deploy --only firestore # Deploy only firestore rules+indexes
firebase deploy --only storage   # Deploy only storage rules
firebase deploy --only functions # Deploy only functions
firebase emulators:start         # Start local emulators
firebase apps:sdkconfig          # Get Firebase config for web app
firebase logout                  # Logout
firebase --help                  # All commands
```

---

## 16. Complete App Architecture

```
User -> Hosting (CDN) -> Firebase Auth -> Firestore (data) + Storage (files)
                           ↕
                     Security Rules
                    
Optional:
  Cloud Functions (backend logic)
  Analytics (user behavior)
  Remote Config (feature flags)
  Messaging (push notifications)
  Performance (monitoring)
  App Check (bot protection)
```

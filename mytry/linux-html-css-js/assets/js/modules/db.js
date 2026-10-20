const DB_NAME = "linux-lib";
const DB_VERSION = 1;

let dbPromise = null;

const openDb = () => {
    if (dbPromise) return dbPromise;
    if (!("indexedDB" in window)) {
        return Promise.reject(new Error("IndexedDB is not available in this browser"));
    }
    dbPromise = new Promise((resolve, reject) => {
        const req = indexedDB.open(DB_NAME, DB_VERSION);
        req.onupgradeneeded = () => {
            const db = req.result;
            if (!db.objectStoreNames.contains("notes")) {
                db.createObjectStore("notes", { keyPath: "id" });
            }
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
    return dbPromise;
};

const requestToPromise = (req) =>
    new Promise((resolve, reject) => {
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });

const withStore = async (name, mode, run) => {
    const db = await openDb();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(name, mode);
        const pending = run(tx.objectStore(name));
        const results = Array.isArray(pending) ? pending : [pending];
        Promise.all(results).then(
            (values) => {
                tx.oncomplete = () => resolve(values.length === 1 ? values[0] : values);
            },
            (err) => reject(err)
        );
        tx.onerror = () => reject(tx.error);
        tx.onabort = () => reject(tx.error);
    });
};

export const idb = {
    supported() {
        return "indexedDB" in window;
    },

    async putAll(records) {
        return withStore("notes", "readwrite", (store) =>
            records.map((record) => store.put(record))
        );
    },

    async getAll() {
        return withStore("notes", "readonly", (store) => store.getAll());
    },

    async removeAll() {
        return withStore("notes", "readwrite", (store) => store.clear());
    },
};
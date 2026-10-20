self.onmessage = (msg) => {
    const { type, data, difficulty = 4 } = msg.data ?? {};
    if (type !== "hash") return;

    const t0 = performance.now();
    let nonce = 0;
    let iterations = 0;
    const target = "0".repeat(difficulty);
    let foundHash = null;

    const attempt = () => {
        let hash = 0x811c9dc5;
        const text = data + nonce + "\u0000";
        for (let i = 0; i < text.length; i++) {
            hash ^= text.charCodeAt(i) & 0xff;
            hash = Math.imul(hash, 0x01000193);
        }
        const hex = (hash >>> 0).toString(16).padStart(8, "0");
        iterations++;
        if (hex.startsWith(target)) {
            foundHash = hex;
            return true;
        }
        nonce++;
        if (nonce >= 0xffffffff) return true;
        return false;
    };

    const burst = () => {
        const ceiling = iterations + 20000;
        while (iterations < ceiling) {
            if (attempt()) {
                self.postMessage({
                    type: "done",
                    nonce,
                    hash: foundHash,
                    iterations,
                    target,
                    ms: performance.now() - t0,
                });
                return;
            }
        }
        self.postMessage({
            type: "progress",
            iterations,
            nonce,
            ms: performance.now() - t0,
        });
        setTimeout(burst, 0);
    };

    burst();
};
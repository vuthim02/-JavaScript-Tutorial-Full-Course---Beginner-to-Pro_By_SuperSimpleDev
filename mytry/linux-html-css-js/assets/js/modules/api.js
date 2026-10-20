export class ApiError extends Error {
    constructor(status, code, message, details) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.code = code;
        this.details = details;
    }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export class ApiClient {
    constructor(baseUrl = "", defaultTimeout = 8000, defaultRetries = 2) {
        this.baseUrl = baseUrl;
        this.defaultTimeout = defaultTimeout;
        this.defaultRetries = defaultRetries;
    }

    async request(method, path, options = {}) {
        const { body, headers = {}, timeout = this.defaultTimeout, retries = this.defaultRetries } = options;
        const url = this.baseUrl + path;
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeout);

        const config = {
            method,
            headers: { "Content-Type": "application/json", ...headers },
            signal: controller.signal,
        };
        if (body !== undefined && method !== "GET") {
            config.body = typeof body === "string" ? body : JSON.stringify(body);
        }

        let attempt = 0;
        let lastError = null;
        while (attempt <= retries) {
            try {
                const res = await fetch(url, config);
                const data = await res.json().catch(() => ({}));
                if (!res.ok) {
                    throw new ApiError(
                        res.status,
                        data?.error?.code || "HTTP_ERROR",
                        data?.error?.message || `Request failed with status ${res.status}`,
                        data?.error?.details
                    );
                }
                return data;
            } catch (err) {
                clearTimeout(timer);
                if (err.name === "AbortError") {
                    throw new ApiError(0, "TIMEOUT", `Request timed out after ${timeout}ms`);
                }
                if (err instanceof ApiError) throw err;
                lastError = err;
                attempt += 1;
                if (attempt <= retries) await sleep(300 * 2 ** (attempt - 1));
            }
        }
        throw new ApiError(
            0,
            "NETWORK_ERROR",
            `Network error: ${lastError?.message || "unreachable"}`
        );
    }

    get(path, options) {
        return this.request("GET", path, options);
    }

    post(path, body, options) {
        return this.request("POST", path, { ...options, body });
    }

    put(path, body, options) {
        return this.request("PUT", path, { ...options, body });
    }

    delete(path, options) {
        return this.request("DELETE", path, options);
    }
}

export const api = new ApiClient();
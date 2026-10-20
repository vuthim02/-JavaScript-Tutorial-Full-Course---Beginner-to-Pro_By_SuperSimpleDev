const wrappedBy = new WeakMap();

class EventBus {
    constructor() {
        this.listeners = new Map();
        this[Symbol.toStringTag] = "EventBus";
    }

    on(event, handler) {
        if (!this.listeners.has(event)) this.listeners.set(event, new Set());
        this.listeners.get(event).add(handler);
        return () => this.off(event, handler);
    }

    once(event, handler) {
        const wrapped = (...args) => {
            this.off(event, wrapped);
            handler(...args);
        };
        wrappedBy.set(handler, wrapped);
        return this.on(event, wrapped);
    }

    off(event, handler) {
        const set = this.listeners.get(event);
        if (set) {
            set.delete(handler);
            const proxy = wrappedBy.get(handler);
            if (proxy) {
                set.delete(proxy);
                wrappedBy.delete(handler);
            }
        }
        return this;
    }

    emit(event, payload) {
        this.listeners.get(event)?.forEach((handler) => {
            try {
                handler(payload);
            } catch (err) {
                console.error(`[EventBus] handler for "${event}" failed:`, err);
            }
        });
        return this;
    }

    listenerCount(event) {
        return this.listeners.get(event)?.size ?? 0;
    }

    clear(event) {
        if (event) this.listeners.delete(event);
        else this.listeners.clear();
        return this;
    }

    *[Symbol.iterator]() {
        for (const [event, handlers] of this.listeners) {
            yield [event, handlers];
        }
    }
}

export const eventBus = new EventBus();
export { EventBus };
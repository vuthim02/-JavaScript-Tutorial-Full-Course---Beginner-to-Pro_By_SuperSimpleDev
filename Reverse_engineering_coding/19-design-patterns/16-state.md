# State Pattern

<img src="https://media.giphy.com/media/l46ChKeGsmsfE3Un6/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## What Problem It Solves

An object's behavior depends on its internal state. With many states, conditionals become unmanageable. The State pattern delegates behavior to state objects.

## Implementation

```javascript
// State interface
class State {
    constructor(player) { this.player = player; }
    play() { throw new Error("Must implement play()"); }
    pause() { throw new Error("Must implement pause()"); }
    stop() { throw new Error("Must implement stop()"); }
    next() { throw new Error("Must implement next()"); }
    previous() { throw new Error("Must implement previous()"); }
}

class PlayingState extends State {
    play() { console.log("Already playing"); }
    pause() { console.log("Pausing playback"); this.player.setState(this.player.pausedState); }
    stop() { console.log("Stopping playback"); this.player.setState(this.player.stoppedState); }
    next() { console.log("Skipping to next track"); }
    previous() { console.log("Going back to previous track"); }
}

class PausedState extends State {
    play() { console.log("Resuming playback"); this.player.setState(this.player.playingState); }
    pause() { console.log("Already paused"); }
    stop() { console.log("Stopping playback"); this.player.setState(this.player.stoppedState); }
    next() { console.log("Skipping to next track (paused)"); }
    previous() { console.log("Going back to previous track (paused)"); }
}

class StoppedState extends State {
    play() { console.log("Starting playback"); this.player.setState(this.player.playingState); }
    pause() { console.log("Cannot pause — player is stopped"); }
    stop() { console.log("Already stopped"); }
    next() { console.log("Cannot skip — player is stopped"); }
    previous() { console.log("Cannot go back — player is stopped"); }
}

class MusicPlayer {
    constructor() {
        this.playingState = new PlayingState(this);
        this.pausedState = new PausedState(this);
        this.stoppedState = new StoppedState(this);
        this.state = this.stoppedState;
    }

    setState(state) { this.state = state; }
    play() { this.state.play(); }
    pause() { this.state.pause(); }
    stop() { this.state.stop(); }
    next() { this.state.next(); }
    previous() { this.state.previous(); }
}

const player = new MusicPlayer();
player.play();   // "Starting playback from beginning"
player.pause();  // "Pausing playback"
player.play();   // "Resuming playback"
player.stop();   // "Stopping playback"
player.pause();  // "Cannot pause — player is stopped"
```

## Real-World Use Case

HTTP connection states, promise states (pending/fulfilled/rejected), UI component states (loading/empty/error/success), game character states.

```javascript
class SimplePromise {
    constructor() {
        this._state = "pending";
        this._handlers = [];
        this._stateMachine = {
            pending: {
                resolve() { this._transition("fulfilled"); },
                reject() { this._transition("rejected"); }
            },
            fulfilled: { resolve() {}, reject() {} },
            rejected: { resolve() {}, reject() {} }
        };
    }

    _transition(newState) { this._state = newState; this._handlers.forEach(h => h()); }

    resolve() { this._stateMachine[this._state].resolve.call(this); }
    reject() { this._stateMachine[this._state].reject.call(this); }

    get state() { return this._state; }
}
```

## Reverse Engineering Questions

| # | Question |
|---|----------|
| 1 | How does State differ from Strategy? (Both swap objects at runtime.) |
| 2 | When does State become overkill compared to a simple state variable? |
| 3 | How would you persist and restore state? |
| 4 | What is a *finite state machine* and how does it relate to this pattern? |
## Next Steps

[Back to Chapter 15](15-strategy.md): Strategy Pattern
[Proceed to Chapter 17](17-iterator.md): Iterator Pattern to learn about iterator pattern.

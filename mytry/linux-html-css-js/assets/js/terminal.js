(function () {
    "use strict";

    const termBody = document.getElementById("term-body");
    const termInput = document.getElementById("term-input");
    const termForm = document.getElementById("term-form");
    const termPrompt = document.getElementById("term-prompt");
    const termWindow = termInput.closest(".term-window");

    /* ---------------- Virtual filesystem ---------------- */

    const fsRoot = {
        name: "",
        type: "dir",
        parent: null,
        children: [
            {
                name: "home",
                type: "dir",
                parent: null,
                children: [
                    {
                        name: "user",
                        type: "dir",
                        parent: null,
                        children: [
                            { name: ".bashrc", type: "file", content: "alias ll='ls -la'\necho 'Welcome back!'\n", parent: null },
                            { name: "notes.txt", type: "file", content: "LINUX NOTES\n===========\n1. sudo rm -rf / will delete EVERYTHING. Do not try it.\n2. The terminal is your friend.\n3. man command  ->  read the manual.\n4. cat file     ->  show a file.\n5. pipe '|' and redirect '>' are powerful.\n", parent: null },
                            { name: "todo.txt", type: "file", content: "TODO\n----\n[ ] Finish HTML & CSS course\n[ ] Learn JavaScript\n[ ] Master the Linux terminal\n[ ] Try Linux on a real machine\n", parent: null },
                            {
                                name: "Documents",
                                type: "dir",
                                parent: null,
                                children: [
                                    { name: "linux-history.txt", type: "file", content: "1991  - Linus announces Linux v0.01\n1992  - Licensed under the GPL\n1994  - Kernel 1.0 released\n2005  - Git is created\n2008  - Android (Linux) launches\nToday - Linux runs most of the internet\n", parent: null },
                                    { name: "linus-bio.txt", type: "file", content: "Linus Benedict Torvalds\nBorn: 28 Dec 1969, Helsinki, Finland\nCreator of the Linux kernel and Git.\n\"Talk is cheap. Show me the code.\"\n", parent: null },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                name: "etc",
                type: "dir",
                parent: null,
                children: [
                    { name: "os-release", type: "file", content: 'NAME="Linux Lib"\nVERSION="6.1.0-lib (Simulated)"\nID=linuxlib\nPRETTY_NAME="Linux Lib 2026"\n', parent: null },
                    { name: "hosts", type: "file", content: "127.0.0.1   localhost\n::1         localhost\n192.168.1.1 gateway\n", parent: null },
                ],
            },
            {
                name: "var",
                type: "dir",
                parent: null,
                children: [
                    { name: "log", type: "dir", parent: null, children: [{ name: "syslog", type: "file", content: "Sep 08 12:00:01 linux-lib user: welcome to the simulation!\nSep 08 12:00:02 linux-lib kernel: boot sequence complete\n", parent: null }] },
                    { name: "tmp", type: "dir", parent: null, children: [] },
                ],
            },
            {
                name: "usr",
                type: "dir",
                parent: null,
                children: [
                    { name: "bin", type: "dir", parent: null, children: [{ name: "ls", type: "file", content: "(binary) ELF executable\n", parent: null }, { name: "cat", type: "file", content: "(binary) ELF executable\n", parent: null }] },
                    { name: "share", type: "dir", parent: null, children: [] },
                ],
            },
            { name: "tmp", type: "dir", parent: null, children: [] },
        ],
    };

    function linkParents(node) {
        if (node.children) {
            node.children.forEach((child) => {
                child.parent = node;
                linkParents(child);
            });
        }
    }
    linkParents(fsRoot);

    /* ---------------- State ---------------- */

    let cwdPath = ["home", "user"];
    const history = [];
    let histIdx = -1;
    let historyLines = [];

    /* ---------------- Path helpers ---------------- */

    function pathFromArray(arr) {
        return arr.length ? "/" + arr.join("/") : "/";
    }

    function displayPath() {
        if (cwdPath.join("/") === "home/user") return "~";
        return pathFromArray(cwdPath);
    }

    function dirFromPath(arr) {
        let node = fsRoot;
        for (const part of arr) {
            if (!node.children) return null;
            node = node.children.find((c) => c.name === part);
            if (!node) return null;
        }
        return node;
    }

    /* Resolve a target against cwd. Returns { node, parentDir, base, isDir } or null. */
    function resolvePath(raw) {
        if (!raw || raw === ".") {
            return {
                node: dirFromPath(cwdPath),
                parentDir: dirFromPath(cwdPath),
                base: null,
            };
        }
        if (raw === "~") {
            return { node: dirFromPath(["home", "user"]), parentDir: dirFromPath(["home"]), base: "user" };
        }

        const parts = raw.split("/");
        let head = raw.startsWith("/") ? fsRoot : dirFromPath(cwdPath);
        if (!head) return null;

        for (let i = 0; i < parts.length; i++) {
            const p = parts[i];
            if (p === "" || p === ".") continue;
            if (p === "..") {
                if (head.parent) head = head.parent;
                continue;
            }
            const child = head.children ? head.children.find((c) => c.name === p) : null;
            if (i === parts.length - 1) {
                return { node: child, parentDir: head, base: p };
            }
            if (!child || child.type !== "dir") return null;
            head = child;
        }
        return { node: head, parentDir: head, base: null };
    }

    /* ---------------- Output ---------------- */

    function printHTML(html, cls) {
        const el = document.createElement("div");
        el.innerHTML = html;
        if (cls) el.className = cls;
        termBody.appendChild(el);
        termBody.scrollTop = termBody.scrollHeight;
    }

    function printLine(text, cls) {
        printHTML(escapeHTML(String(text)), cls);
    }

    function escapeHTML(s) {
        return s
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }

    function renderPrompt() {
        termPrompt.innerHTML =
            '<span class="p-user">user</span>@<span class="p-host">linux-lib</span>:<span class="p-path">' +
            escapeHTML(displayPath()) +
            '</span><span class="prompt-symbol">$</span>';
    }

    function clearScreen() {
        termBody.innerHTML = "";
        renderPrompt();
    }

    function sleep(ms) {
        return new Promise((r) => setTimeout(r, ms));
    }

    /* ---------------- Boot sequence ---------------- */

    async function boot() {
        const lines = [
            ['<span class="t-muted">Linux Lib v6.1.0-sim — terminal simulator</span>'],
            ['<span class="t-muted">BIOS</span> <span class="t-dim">[</span><span class="t-ok">  OK  </span><span class="t-dim">]</span> <span class="t-dim">Loading initial ramdisk</span>'],
            ['<span class="t-muted">KERNEL</span> <span class="t-dim">[</span><span class="t-ok">  OK  </span><span class="t-dim">]</span> <span class="t-dim">Scheduling assorted daemons</span>'],
            ['<span class="t-muted">KERNEL</span> <span class="t-dim">[</span><span class="t-ok">  OK  </span><span class="t-dim">]</span> <span class="t-dim">Mounting root filesystem (simulated)</span>'],
            ['<span class="t-muted">SYSTEMD</span> <span class="t-dim">[</span><span class="t-ok">  OK  </span><span class="t-dim">]</span> <span class="t-dim">Reached target "Multi-User System"</span>'],
            ['<span class="t-warn">  WARNING:</span> <span class="t-warn">commands here cannot break anything real — have fun!</span>'],
        ];
        for (const [html] of lines) {
            const el = document.createElement("div");
            el.innerHTML = html;
            el.className = "boot-line t-muted";
            termBody.appendChild(el);
            termBody.scrollTop = termBody.scrollHeight;
            await sleep(260);
        }
        const art = [
            "      .--.",
            "     |o_o |",
            "     |:_/ |",
            "    //   \\ \\",
            "   (|     | )",
            "  /'\\_   _/`\\",
            "  \\___)=(___/",
        ];
        art.forEach((line, i) => {
            const el = document.createElement("div");
            el.innerHTML =
                '<span class="t-cyan">' + escapeHTML(line) + "</span>";
            el.className = "boot-line";
            termBody.appendChild(el);
        });
        await sleep(300);
        printLine("Welcome to Linux Lib! Type 'help' to list commands.", "t-dim");
        renderPrompt();
        termWindow.classList.add("is-ready");
        termInput.focus();
    }

    /* ---------------- Command implementations ---------------- */

    function cmdHelp() {
        const rows = [
            ["help", "show this help screen"],
            ["pwd", "print working directory"],
            ["ls [-l] [-a] [dir]", "list directory contents"],
            ["cd <dir>", "change directory (supports .., ~, /)"],
            ["cat <file>", "print file contents"],
            ["echo <text>", "print text to the screen"],
            ["mkdir <name>", "create a directory"],
            ["touch <file>", "create an empty file"],
            ["rm <file>", "remove a file (-r for directories)"],
            ["tree", "show the filesystem as a tree"],
            ["whoami", "who you are"],
            ["hostname", "print the machine name"],
            ["date", "current date & time"],
            ["uname [-a]", "system information"],
            ["neofetch", "fun system info with Tux"],
            ["man <command>", "show the manual for a command"],
            ["history", "list the commands you typed"],
            ["df -h", "disk usage"],
            ["free -h", "memory usage"],
            ["hash <text>", "FNV-1a hash demo (typed arrays + generators)"],
            ["cpu [difficulty]", "mine a hash in a Web Worker (1-6)"],
            ["sudo <command>", "elevate privileges (spoiler: you can't)"],
            ["clear / cls / Ctrl+L", "clear the screen"],
            ["exit", "try it and see"],
        ];
        const width = Math.max(...rows.map((r) => r[0].length));
        rows.forEach(([cmd, desc]) => {
            printLine(
                "  <span class='t-warn'>" +
                    escapeHTML(cmd.padEnd(width)) +
                    "</span>  <span class='t-dim'>" +
                    escapeHTML(desc) +
                    "</span>"
            );
        });
    }

    function cmdPwd() {
        printLine(pathFromArray(cwdPath), "t-dim");
    }

    function cmdLs(args) {
        let flags = [];
        let target = ".";
        args.forEach((a) => {
            if (a.startsWith("-")) flags.push(a.replace(/-/g, ""));
            else target = a;
        });
        const res = resolvePath(target);
        if (!res || !res.node || res.node.type !== "dir") {
            printLine("ls: cannot access '" + target + "': No such directory", "t-error");
            return;
        }
        const dir = res.node;
        const showAll = flags.includes("a");
        const long = flags.includes("l");

        let items = dir.children || [];
        if (!showAll) items = items.filter((c) => !c.name.startsWith("."));

        if (items.length === 0) {
            printLine("(empty)", "t-muted");
            return;
        }

        items.sort((a, b) => {
            if (a.type !== b.type) return a.type === "dir" ? -1 : 1;
            return a.name.localeCompare(b.name);
        });

        if (long) {
            let total = 0;
            items.forEach((c) => (total += c.type === "file" ? (c.content ? c.content.length : 1) : 4096));
            printLine("total " + total, "t-dim");
            items.forEach((c) => {
                const perms = c.type === "dir" ? "drwxr-xr-x" : "-rw-r--r--";
                const size = c.type === "dir" ? 4096 : c.content ? c.content.length : 0;
                const name = c.name + (c.type === "dir" ? "/" : "");
                const cls = c.type === "dir" ? "dir" : c.name.startsWith(".") ? "hidden" : "file";
                printLine(
                    "<span class='t-dim'>" +
                        escapeHTML(perms + "  " + String(size).padStart(6) + "  user user") +
                        "</span>  <span class='" +
                        cls +
                        "'>" +
                        escapeHTML(name) +
                        "</span>"
                );
            });
        } else {
            const row = items
                .map((c) => {
                    const cls = c.type === "dir" ? "dir" : c.name.startsWith(".") ? "hidden" : "file";
                    const name = c.name + (c.type === "dir" ? "/" : "");
                    return "<span class='" + cls + "'>" + escapeHTML(name) + "</span>";
                })
                .join("  ");
            printLine(row);
        }
    }

    function cmdCd(arg) {
        if (!arg || arg === "~") arg = "~";
        const res = resolvePath(arg);
        if (!res || !res.node || res.node.type !== "dir") {
            printLine("cd: no such directory: '" + arg + "'", "t-error");
            return;
        }
        const node = res.node;
        const arr = [];
        let n = node;
        while (n) {
            if (n.name) arr.unshift(n.name);
            n = n.parent;
        }
        cwdPath = arr;
        renderPrompt();
    }

    function cmdCat(arg) {
        if (!arg) {
            printLine("cat: missing operand", "t-error");
            return;
        }
        const res = resolvePath(arg);
        if (!res || !res.node) {
            printLine("cat: " + arg + ": No such file or directory", "t-error");
            return;
        }
        if (res.node.type === "dir") {
            printLine("cat: " + arg + ": Is a directory", "t-error");
            return;
        }
        printLine(escapeHTML(res.node.content || ""), "t-dim");
    }

    function cmdEcho(args) {
        let text = args.join(" ");
        text = text.replace(/\$USER/g, "user").replace(/\$HOSTNAME/g, "linux-lib");
        text = text.replace(/\$PWD/g, pathFromArray(cwdPath)).replace(/\$HOME/g, "/home/user");
        text = text.replace(/^["']|["']$/g, "");
        printLine(text);
    }

    function cmdMkdir(arg) {
        if (!arg) {
            printLine("mkdir: missing operand", "t-error");
            return;
        }
        const res = resolvePath(arg);
        if (!res || !res.parentDir) {
            printLine("mkdir: cannot create directory '" + arg + "': No such file or directory", "t-error");
            return;
        }
        if (res.node) {
            printLine("mkdir: cannot create directory '" + arg + "': File exists", "t-error");
            return;
        }
        res.parentDir.children.push({ name: res.base, type: "dir", parent: res.parentDir, children: [] });
        printLine("directory created: " + arg, "t-dim");
    }

    function cmdTouch(arg) {
        if (!arg) {
            printLine("touch: missing file operand", "t-error");
            return;
        }
        const res = resolvePath(arg);
        if (!res || !res.parentDir) {
            printLine("touch: cannot touch '" + arg + "': No such file or directory", "t-error");
            return;
        }
        if (!res.node) {
            res.parentDir.children.push({ name: res.base, type: "file", parent: res.parentDir, content: "" });
        }
        printLine("file touched: " + arg, "t-dim");
    }

    function cmdRm(args) {
        const recursive = args.includes("-r");
        const target = args.filter((a) => !a.startsWith("-")).join(" ");
        if (!target) {
            printLine("rm: missing operand", "t-error");
            return;
        }
        const res = resolvePath(target);
        if (!res || !res.node) {
            printLine("rm: cannot remove '" + target + "': No such file or directory", "t-error");
            return;
        }
        if (res.node.type === "dir" && !recursive) {
            printLine("rm: cannot remove '" + target + "': Is a directory (use rm -r)", "t-error");
            return;
        }
        res.parentDir.children = res.parentDir.children.filter((c) => c !== res.node);
        printLine("removed: " + target, "t-dim");
    }

    function cmdTree(arg) {
        const rootTarget = resolvePath(arg || ".");
        if (!rootTarget || !rootTarget.node || rootTarget.node.type !== "dir") {
            printLine("tree: no such directory", "t-error");
            return;
        }
        const lines = [];
        function walk(node, prefix) {
            const kids = node.children ? node.children.filter((c) => !c.name.startsWith(".")) : [];
            kids.forEach((child, i) => {
                const last = i === kids.length - 1;
                lines.push(
                    prefix +
                        (last ? "`-- " : "|-- ") +
                        child.name +
                        (child.type === "dir" ? "/" : "")
                );
                if (child.type === "dir") walk(child, prefix + (last ? "    " : "|   "));
            });
        }
        lines.push((arg || ".").replace(/\/$/, "") + "/");
        if (rootTarget.node.children) walk(rootTarget.node, "");
        lines.forEach((l) => printLine(escapeHTML(l), "t-dim"));
    }

    function cmdMan(arg) {
        const manPages = {
            ls: "ls [options] [directory]\n  -l  long format\n  -a  show hidden files\nList directory contents.",
            cd: "cd [directory]\nChange the working directory. Use .. for parent, ~ for home.",
            cat: "cat [file]\nPrint the contents of one or more files.",
            echo: "echo [text]\nPrint text to the terminal. Supports $USER, $HOME, $PWD.",
            pwd: "pwd\nPrint the current working directory.",
            whoami: "whoami\nPrint your username.",
            mkdir: "mkdir [directory]\nCreate a new directory.",
            touch: "touch [file]\nCreate an empty file.",
            rm: "rm [-r] [file]\nRemove a file. Use -r to remove directories.",
            sudo: "sudo [command]\nRun a command with superuser privileges. (Not in this sandbox!)",
        };
        if (!arg) {
            printLine("What manual page do you want?", "t-error");
            printLine("Use: man <command>  e.g. man ls", "t-dim");
            return;
        }
        if (manPages[arg]) {
            manPages[arg]
                .split("\n")
                .forEach((l) => printLine(escapeHTML(l), l.startsWith(capitalize(arg)) ? "t-warn" : "t-dim"));
        } else {
            printLine("No manual entry for " + arg, "t-error");
        }
        function capitalize(s) {
            return s.charAt(0).toUpperCase() + s.slice(1);
        }
    }

    function cmdHistory() {
        history.forEach((cmd, i) => {
            printLine(
                "  <span class='t-muted'>" +
                    String(i + 1).padStart(3) +
                    "</span> " +
                    escapeHTML(cmd)
            );
        });
    }

    function cmdNeofetch() {
        const art = [
            "      .--.",
            "     |o_o |",
            "     |:_/ |",
            "    //   \\ \\",
            "   (|     | )",
            "  /'\\_   _/`\\",
            "  \\___)=(___/",
        ];
        const info = [
            ["user@linux-lib", "t-cyan"],
            ["---------", "t-dim"],
            ["OS: Linux Lib 2026 (simulated)", "t-dim"],
            ["Kernel: 6.1.0-lib-sim", "t-dim"],
            ["Shell: bash 5.2", "t-dim"],
            ["CPU: Virtual LearnCore i9 (0 cores)", "t-dim"],
            ["Memory: 4096MiB (2GiB used)", "t-dim"],
        ];
        const artBlock = art.map((l, i) => {
            const infoLine = info[i] ? "<span class='" + info[i][1] + "'>" + escapeHTML(info[i][0]) + "</span>" : "";
            return "<span class='t-cyan'>" + escapeHTML(l) + "</span>  " + infoLine;
        });
        artBlock.forEach((html) => printHTML(html));
    }

    function cmdDf() {
        printLine("Filesystem     1K-blocks    Used Available Use% Mounted on", "t-dim");
        printLine("dev/sda1        30720000 1126400  29593600   4%  /", "t-dim");
        printLine("tmpfs           2097152       128   2097024   1%  /dev/shm", "t-dim");
    }

    function cmdFree() {
        printLine("               total        used        free      shared     cache", "t-dim");
        printLine("Mem:           4096MiB     2048MiB     1024MiB       128MiB      1024MiB", "t-dim");
        printLine("Swap:          2048MiB        0MiB     2048MiB", "t-dim");
    }

    function cmdDate() {
        printLine(new Date().toString(), "t-dim");
    }

    function cmdUname(args) {
        if (args.includes("-a")) {
            printLine("Linux linux-lib 6.1.0-lib-sim #1 SMP x86_64 GNU/Linux", "t-dim");
        } else {
            printLine("Linux", "t-dim");
        }
    }

    /* ---------------- Hash & worker demos (JS features) ---------------- */

    function fnv1a(input) {
        const bytes = new TextEncoder().encode(String(input));
        let hash = 0x811c9dc5;
        for (const byte of bytes) {
            hash ^= byte;
            hash = Math.imul(hash, 0x01000193);
        }
        return hash >>> 0;
    }

    function* hexDump(bytes, perRow) {
        const cols = perRow || 8;
        for (let offset = 0; offset < bytes.length; offset += cols) {
            const row = bytes.subarray(offset, offset + cols);
            let hexParts = "";
            let ascii = "";
            for (let i = 0; i < cols; i++) {
                if (i < row.length) {
                    hexParts += row[i].toString(16).padStart(2, "0") + " ";
                    ascii += row[i] >= 32 && row[i] <= 126 ? String.fromCharCode(row[i]) : ".";
                } else {
                    hexParts += "   ";
                }
            }
            yield [offset, hexParts.trimEnd(), ascii];
        }
    }

    function cmdHash(args) {
        const text = args.join(" ").trim();
        if (!text) {
            printLine("usage: hash <text>", "t-error");
            return;
        }
        const bytes = new TextEncoder().encode(text);
        printLine("FNV-1a 32-bit hash — TextEncoder + Uint8Array + Math.imul + a generator", "t-dim");
        printLine('input  : "' + text + '"', "t-dim");
        printLine("bytes  : " + bytes.length + " (" + bytes.constructor.name + ")", "t-dim");
        printLine("result : 0x" + fnv1a(text).toString(16).padStart(8, "0"), "t-warn");
        printLine("hex dump (rendered with the hexDump generator):", "t-muted");
        for (const [offset, hex, ascii] of hexDump(bytes)) {
            printLine("  " + offset.toString(16).padStart(8, "0") + "  " + hex + "  " + ascii, "t-dim");
        }
    }

    function cmdCpu(args) {
        const difficulty = Math.min(6, Math.max(1, parseInt(args[0], 10) || 3));
        const target = "0".repeat(difficulty);
        const payload = "linux-lib:" + Date.now().toString(36);

        if (!("Worker" in window)) {
            printLine("Web Worker unavailable — time to test worst-case blocking:", "t-warn");
            const t0 = performance.now();
            let nonce = 0;
            while (true) {
                if (fnv1a(payload + nonce).toString(16).padStart(8, "0").startsWith(target)) break;
                nonce++;
            }
            printLine("  found nonce " + nonce + " → 0x" + fnv1a(payload + nonce).toString(16).padStart(8, "0"), "t-warn");
            printLine("  took " + (performance.now() - t0).toFixed(0) + " ms (the tab froze!)", "t-error");
            return;
        }

        printLine("mining an FNV-1a nonce in a Web Worker (target: 0x" + target + "…) — main thread stays free.", "t-dim");
        const worker = new Worker("../assets/js/workers/hash.worker.js");
        const statusLine = document.createElement("div");
        statusLine.className = "t-dim";
        termBody.appendChild(statusLine);

        worker.onmessage = (e) => {
            const m = e.data;
            if (m.type === "progress") {
                const perSec = Math.round(m.iterations / (m.ms / 1000)) || 0;
                statusLine.innerHTML =
                    "  … " + m.iterations.toLocaleString() + " hashes (" + perSec.toLocaleString() + " h/s) — rename files while it works";
            } else if (m.type === "done") {
                statusLine.innerHTML = "";
                printLine("  found nonce " + m.nonce + " → 0x" + m.hash, "t-warn");
                printLine("  tried " + m.iterations.toLocaleString() + " hashes in " + m.ms.toFixed(0) + " ms, in a background thread.", "t-dim");
                worker.terminate();
            }
        };
        worker.onerror = (err) => {
            statusLine.innerHTML = "";
            printLine("worker error: " + err.message, "t-error");
            worker.terminate();
        };
        worker.postMessage({ type: "hash", data: payload, difficulty });
    }

    /* ---------------- Command dispatcher ---------------- */

    function runCommand(rawLine) {
        const line = rawLine.trim();
        if (line) {
            history.push(line);
            histIdx = history.length;
        }

        const parts = line.split(/\s+/);
        const cmd = (parts[0] || "").toLowerCase();
        const args = parts.slice(1);

        switch (cmd) {
            case "help":
                cmdHelp();
                break;
            case "pwd":
                cmdPwd();
                break;
            case "ls":
            case "ll":
                cmdLs(cmd === "ll" ? ["-l", "-a"].concat(args) : args);
                break;
            case "cd":
                cmdCd(args.join(" "));
                break;
            case "cat":
                cmdCat(args.join(" "));
                break;
            case "echo":
                cmdEcho(args);
                break;
            case "mkdir":
                cmdMkdir(args.join(" "));
                break;
            case "touch":
                cmdTouch(args.join(" "));
                break;
            case "rm":
                cmdRm(args);
                break;
            case "tree":
                cmdTree(args.join(" ") || ".");
                break;
            case "whoami":
                printLine("user", "t-dim");
                break;
            case "hostname":
                printLine("linux-lib", "t-dim");
                break;
            case "date":
                cmdDate();
                break;
            case "uname":
                cmdUname(args);
                break;
            case "neofetch":
                cmdNeofetch();
                break;
            case "man":
                cmdMan(args.join(" "));
                break;
            case "history":
                cmdHistory();
                break;
            case "df":
                cmdDf();
                break;
            case "free":
                cmdFree();
                break;
            case "hash":
                cmdHash(args);
                break;
            case "cpu":
                cmdCpu(args);
                break;
            case "sudo":
                if (args.length === 0) {
                    printLine("usage: sudo <command>", "t-warn");
                } else if (args.includes("rm") && args.includes("-rf")) {
                    printLine(
                        "sudo: nice try. " +
                            (args.includes("/") ? "rm -rf / is blocked. This incident WILL be reported to Linus." : "Not allowed."),
                        "t-warn"
                    );
                } else {
                    printLine(
                        "user is not in the sudoers file. This incident will be reported.",
                        "t-warn"
                    );
                }
                break;
            case "clear":
            case "cls":
                clearScreen();
                break;
            case "exit":
                printLine("There's no escape. The terminal is forever. (Or just close the tab.)", "t-warn");
                break;
            case "":
                break;
            default:
                printLine(cmd + ": command not found", "t-error");
                printLine(
                    "Hint: type 'help' to see available commands.",
                    "t-dim"
                );
        }
    }

    function printPromptAndCommand(line) {
        printHTML(
            '<span class="p-user">user</span>@<span class="p-host">linux-lib</span>:<span class="p-path">' +
                escapeHTML(displayPath()) +
                '</span><span class="prompt-symbol">$</span> ' +
                escapeHTML(line),
            "term-line-in"
        );
    }

    /* ---------------- Events ---------------- */

    termForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const line = termInput.value;
        termInput.value = "";
        printPromptAndCommand(line);
        runCommand(line);
        renderPrompt();
        termBody.scrollTop = termBody.scrollHeight;
    });

    termInput.addEventListener("keydown", (e) => {
        if (e.key === "ArrowUp") {
            e.preventDefault();
            if (history.length === 0) return;
            histIdx = Math.max(0, histIdx - 1);
            termInput.value = history[histIdx] || "";
            termInput.setSelectionRange(termInput.value.length, termInput.value.length);
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            histIdx = Math.min(history.length, histIdx + 1);
            termInput.value = histIdx < history.length ? history[histIdx] : "";
            termInput.setSelectionRange(termInput.value.length, termInput.value.length);
        } else if (e.key === "l" && e.ctrlKey) {
            e.preventDefault();
            clearScreen();
        }
    });

    termInput.addEventListener("input", () => {
        if (!termWindow.classList.contains("is-ready")) {
            termWindow.classList.add("is-ready");
        }
    });

    document.addEventListener("click", (e) => {
        if (!e.target.closest(".term-window") && !e.target.closest(".navbar")) {
            return;
        }
        termInput.focus();
    });

    window.addEventListener("load", () => {
        boot();
        renderPrompt();
    });
})();
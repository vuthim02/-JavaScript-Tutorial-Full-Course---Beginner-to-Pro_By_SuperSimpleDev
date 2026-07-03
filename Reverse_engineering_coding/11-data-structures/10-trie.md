# Trie (Prefix Tree)

## Word Storage

```
Root
 │
 └── c
      │
      └── a
           │
           ├── t ← "cat" (end)
           │
           └── r
                │
                └── e ← "care" (end)
```

## Implementation

```javascript
class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() { this.root = new TrieNode(); }

    insert(word) {
        let node = this.root;
        for (const char of word) {
            if (!node.children[char]) node.children[char] = new TrieNode();
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }

    search(word) {
        let node = this.root;
        for (const char of word) {
            if (!node.children[char]) return false;
            node = node.children[char];
        }
        return node.isEndOfWord;
    }

    startsWith(prefix) {
        let node = this.root;
        for (const char of prefix) {
            if (!node.children[char]) return false;
            node = node.children[char];
        }
        return true;
    }

    autocomplete(prefix) {
        const results = [];
        let node = this.root;
        for (const char of prefix) {
            if (!node.children[char]) return results;
            node = node.children[char];
        }

        function collect(node, word) {
            if (node.isEndOfWord) results.push(word);
            for (const [char, child] of Object.entries(node.children)) {
                collect(child, word + char);
            }
        }

        collect(node, prefix);
        return results;
    }
}
```

## Applications: Autocomplete

```javascript
const trie = new Trie();
trie.insert("cat"); trie.insert("car"); trie.insert("care");
trie.insert("card"); trie.insert("cart");

console.log(trie.autocomplete("ca"));
// ["cat", "car", "care", "card", "cart"]

console.log(trie.autocomplete("car"));
// ["car", "care", "card", "cart"]
```

## Trie vs Hash Table

| Feature | Trie | Hash Table |
|---|---|---|
| Prefix search | O(n) | O(n × m) — must scan all keys |
| Memory | More (child pointers) | Less |
| Insert | O(n) | O(1) average |
| Search | O(n) | O(1) average |
| Ordered traversal | Yes (alphabetical) | No |
| Key deletion | Complex | O(1) average |

## Reverse Engineering Questions

| Question | Answer |
|---|---|
| Word/prefix lookup? | Trie is ideal for dictionary and autocomplete. |
| Need prefix search? | Trie finds all words with prefix in O(n + m) time. |
| Spell checker? | Trie + BFS/DFS for closest word suggestions. |
## Next Steps

[Back to Chapter 9](09-graph.md): Graph
[Proceed to Chapter 11](11-searching.md): Searching to learn about searching.

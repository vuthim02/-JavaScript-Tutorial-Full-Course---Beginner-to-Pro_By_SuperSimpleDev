# Backtracking

<img src="https://media.giphy.com/media/l0HlwKpPGceLgQC9W/giphy.gif" alt="Animated GIF" style="width:400px; height:300px;">


## Explore, Undo, Try Again

Backtracking incrementally builds candidates and abandons them (backtracks) as soon as it determines they cannot lead to a valid solution. It is a systematic way to try all possibilities.

## N-Queens Problem

```javascript
function solveNQueens(n) {
    const result = [];
    const board = Array(n).fill().map(() => Array(n).fill('.'));

    function isSafe(row, col) {
        // Check column
        for (let i = 0; i < row; i++) if (board[i][col] === 'Q') return false;
        // Check upper-left diagonal
        for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) if (board[i][j] === 'Q') return false;
        // Check upper-right diagonal
        for (let i = row, j = col; i >= 0 && j < n; i--, j++) if (board[i][j] === 'Q') return false;
        return true;
    }

    function placeQueens(row) {
        if (row === n) {
            result.push(board.map(r => r.join('')));
            return;
        }

        for (let col = 0; col < n; col++) {
            if (isSafe(row, col)) {
                board[row][col] = 'Q';   // Try
                placeQueens(row + 1);     // Recurse
                board[row][col] = '.';    // Backtrack (undo)
            }
        }
    }

    placeQueens(0);
    return result;
}

console.log(solveNQueens(4));
// [
//   ['.Q..', '...Q', 'Q...', '..Q.'],
//   ['..Q.', 'Q...', '...Q', '.Q..']
// ]
```

## Backtracking Pattern

```javascript
function backtrack(state, options, result) {
    if (isSolution(state)) {
        result.push(copy(state));
        return;
    }

    for (const option of options) {
        if (isValid(option, state)) {
            makeMove(option, state);    // Try
            backtrack(state, options, result); // Recurse
            undoMove(option, state);    // Backtrack (undo)
        }
    }
}
```

This pattern applies to: permutations, combinations, subsets, N-Queens, Sudoku, and many constraint satisfaction problems.

## Applications: Sudoku Solver

```javascript
function solveSudoku(board) {
    function isValid(board, row, col, num) {
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === num) return false;
            if (board[i][col] === num) return false;
            const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
            const boxCol = 3 * Math.floor(col / 3) + (i % 3);
            if (board[boxRow][boxCol] === num) return false;
        }
        return true;
    }

    function solve() {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === '.') {
                    for (let num = 1; num <= 9; num++) {
                        const char = String(num);
                        if (isValid(board, row, col, char)) {
                            board[row][col] = char; // Try
                            if (solve()) return true; // Recurse
                            board[row][col] = '.';    // Backtrack
                        }
                    }
                    return false; // No valid number — backtrack
                }
            }
        }
        return true; // All cells filled
    }

    solve();
    return board;
}
```

## Reverse Engineering Questions

| Question | Answer |
|---|---|
| Is this a constraint satisfaction problem? | Use backtracking to try possibilities that satisfy all constraints. |
| Is there a clear undo step? | Backtracking requires a way to revert the last decision. |
| Can pruning help? | Check validity early (like `isSafe` or `isValid`) to avoid exploring dead ends. |
## Next Steps

[Back to Chapter 15](15-greedy.md): Greedy Algorithms
[Proceed to Chapter 17](17-sliding-window.md): Sliding Window to learn about sliding window.

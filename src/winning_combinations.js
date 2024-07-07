// Here specifying all the winning combinations for our tic tac toe game as array of objects and each array element contains three objects specifing row and column index value for the winning combination, here each array contains only three objects(because our game winnig state depends on three boxes only)

// exporting this array of objects and importing in App.jsx component.

export const WINNING_COMBINATIONS = [
    [
        { row: 0, column: 0 },
        { row: 0, column: 1 },
        { row: 0, column: 2 },
    ],
    [
        { row: 1, column: 0 },
        { row: 1, column: 1 },
        { row: 1, column: 2 },
    ],
    [
        { row: 2, column: 0 },
        { row: 2, column: 1 },
        { row: 2, column: 2 },
    ],
    [
        { row: 0, column: 0 },
        { row: 1, column: 0 },
        { row: 2, column: 0 },
    ],
    [
        { row: 0, column: 1 },
        { row: 1, column: 1 },
        { row: 2, column: 1 },
    ],
    [
        { row: 0, column: 2 },
        { row: 1, column: 2 },
        { row: 2, column: 2 },
    ],
    [
        { row: 0, column: 0 },
        { row: 1, column: 1 },
        { row: 2, column: 2 },
    ],
    [
        { row: 0, column: 2 },
        { row: 1, column: 1 },
        { row: 2, column: 0 },
    ],
];
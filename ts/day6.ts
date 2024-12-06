if (import.meta.main) {
    const text = await Deno.readTextFile("./input/day6.txt");
    let startRow = 0, startCol = 0;
    let storeStartRow = 0, storeStartCol = 0;
    let travelRow = -1, travelCol = 0;
    const obstacle = "#"
    const lines: string[] = text.split("\n").map((_, row) => {
        const trimmed = _.trim();
        if (trimmed.indexOf('^') !== -1) {
            startCol = trimmed.indexOf('^')
            startRow = row;
            storeStartCol = startCol;
            storeStartRow = startRow;
        }
        return trimmed;
    })
    const past: number[] = [startRow * lines.length * 12 + startCol];
    const pathCoords: number[][] = [];
    while (startRow < lines.length && startCol < lines[0].length && startRow >= 0 && startCol >= 0) {
        startRow += travelRow;
        startCol += travelCol;
        if (lines[startRow] && lines[startRow][startCol] === obstacle) {
            startRow -= travelRow;
            startCol -= travelCol;
            const [tempRow, tempCol] = [travelRow, travelCol];
            travelCol = -1 * tempRow;
            travelRow = tempCol;
            continue;
        }
        if (!past.includes(startRow * (lines.length * 12) + startCol)) {
            past.push(startRow * lines.length * 12 + startCol)
            pathCoords.push([startRow, startCol])
        }
    }
    pathCoords.pop();
    let ans2 = 0;
    for (let pathCoord of pathCoords) {
        let newInput: string[] = [...lines];
        let line = [...lines[pathCoord[0]]];
        line[pathCoord[1]] = obstacle;
        newInput[pathCoord[0]] = line.join("");
        if (isCyclic({ startRow: storeStartRow, startCol: storeStartCol, lines: newInput, obstacle }))
            ans2++;
    }
    console.log(ans2)

    // pathCoords 
}

function isCyclic({ startRow, startCol, lines, obstacle }: { startRow: number, startCol: number, lines: string[], obstacle: string }): boolean {
    const past: number[] = [startRow * lines.length * 12 + startCol];
    let travelRow = -1, travelCol = 0;
    while (startRow < lines.length && startCol < lines[0].length && startRow >= 0 && startCol >= 0) {
        startRow += travelRow;
        startCol += travelCol;
        if (lines[startRow] && lines[startRow][startCol] === obstacle) {
            startRow -= travelRow;
            startCol -= travelCol;
            const [tempRow, tempCol] = [travelRow, travelCol];
            travelCol = -1 * tempRow;
            travelRow = tempCol;
            continue;
        }
        past.push(startRow * lines.length * 12 + startCol)
        if (past.length > (lines.length * lines[0].length))
            return true;
    }
    return false;
}
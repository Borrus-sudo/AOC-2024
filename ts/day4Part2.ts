if (import.meta.main) {
    const text = await Deno.readTextFile("./input/day4.txt");
    const lines = text.split("\n").map(_ => _.trim());
    let ans = 0;
    for (let row = 1; row < lines.length - 1; row++) {
        for (let col = 1; col < lines.length - 1; col++) {
            const leftDiagonal = lines[row - 1][col - 1] + lines[row][col] + lines[row + 1][col + 1];
            const rightDiagonal = lines[row - 1][col + 1] + lines[row][col] + lines[row + 1][col - 1];
            if ((leftDiagonal === "MAS" || leftDiagonal === "SAM") && (rightDiagonal === "SAM" || rightDiagonal === "MAS"))
                ans++;
        }

    }
    console.log(ans)
}
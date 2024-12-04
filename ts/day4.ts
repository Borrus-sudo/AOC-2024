if (import.meta.main) {
    const text = await Deno.readTextFile("./input/day4.txt");
    const lines = text.split("\n").map(_ => _.trim());
    const lineLen = lines[0].length;
    const combinedText = lines.join("");
    console.log(combinedText)
    let offset = 0;
    let ans = 0;
    for (let line of lines) {
        // front back check
        console.log(line)
        ans += ((line.match(/XMAS/g)?.length || 0) + (line.match(/SAMX/g)?.length || 0));
        // for each index, check four down
        const diagonalGoAhead = lineLen + 1;
        const rightDiagonalGoAhead = lineLen - 1;
        const topBottomGoAhead = lineLen;
        // break
        for (let i = 0; i < line.length; i++) {
            if (i > 2) {
                const diagonal = combinedText[offset + i] + combinedText[offset + i + rightDiagonalGoAhead] + combinedText[offset + i + 2 * rightDiagonalGoAhead] + combinedText[offset + i + 3 * rightDiagonalGoAhead]
                if (diagonal === "XMAS" || diagonal === "SAMX") {
                    console.log({ diagonal })
                    ans++;
                }
            }
            if (i < line.length - 3) {
                const diagonal = combinedText[offset + i] + combinedText[offset + i + diagonalGoAhead] + combinedText[offset + i + 2 * diagonalGoAhead] + combinedText[offset + i + 3 * diagonalGoAhead]
                if (diagonal === "XMAS" || diagonal === "SAMX") {
                    console.log({ diagonal })
                    ans++;
                }
            }
            const topBottom = combinedText[offset + i] + combinedText[offset + i + topBottomGoAhead] + combinedText[offset + i + 2 * topBottomGoAhead] + combinedText[offset + i + 3 * topBottomGoAhead];
            if (topBottom === "XMAS" || topBottom === "SAMX") {
                console.log({ topBottom })
                ans++;
            }
        }
        offset += (lineLen)
        console.log(ans)
    }
    console.log(ans)
}
if (import.meta.main) {

    const text = await Deno.readTextFile("./input/day8.txt");
    console.time(
        "Measure"
    )
    const antennaPos: Map<string, [number, number][]> = new Map();
    const lines = text.split("\n").map(_ => _.trim())
    lines.forEach((_, row) => {
        [..._].forEach((c, col) => {
            if (c.match(/[A-Za-z0-9]/)) {
                antennaPos.set(c, [...(antennaPos.get(c) || []), [row, col]])
            }

        })
    })
    const height = lines.length;
    const width = lines[0].length;
    let ans1 = 0;
    let ans2 = 0;
    let covered1: number[] = [];
    let covered2: number[] = [];
    let dim = Math.max(height, width);
    for (let positions of antennaPos.values()) {
        for (let i = 0; i < positions.length; i++) {
            for (let j = i + 1; j < positions.length; j++) {
                let a = positions[i];
                let b = positions[j];
                let slope1 = {
                    x: a[0] - b[0],
                    y: a[1] - b[1]
                }
                let slope2 = {
                    x: -slope1.x, y: -slope1.y
                }
                const antinode1 = {
                    x: 2 * a[0] - b[0],
                    y: 2 * a[1] - b[1]
                }
                const antinode2 = {
                    x: 2 * b[0] - a[0],
                    y: 2 * b[1] - a[1]
                }
                if (antinode1.x >= 0 && antinode1.x < width && antinode1.y >= 0 && antinode1.y < height && !covered1.includes(antinode1.x * dim + antinode1.y)) {
                    ans1++;
                    covered1.push(antinode1.x * dim + antinode1.y)

                }
                if (antinode2.x >= 0 && antinode2.x < width && antinode2.y >= 0 && antinode2.y < height && !covered1.includes(antinode2.x * dim + antinode2.y)) {
                    ans1++;
                    covered1.push(antinode2.x * dim + antinode2.y)
                }
                let dir1 = {
                    x: b[0] + slope1.x,
                    y: b[1] + slope1.y
                }
                while (dir1.x >= 0 && dir1.x < width && dir1.y >= 0 && dir1.y < height) {
                    if (!covered2.includes(dir1.x * dim + dir1.y)) {
                        ans2++;
                        covered2.push(dir1.x * dim + dir1.y)
                    }
                    dir1.x += slope1.x;
                    dir1.y += slope1.y;
                }
                let dir2 = {
                    x: a[0] + slope2.x,
                    y: a[1] + slope2.y
                }
                while (dir2.x >= 0 && dir2.x < width && dir2.y >= 0 && dir2.y < height) {
                    if (!covered2.includes(dir2.x * dim + dir2.y)) {
                        ans2++;
                        covered2.push(dir2.x * dim + dir2.y)
                    }
                    dir2.x += slope2.x;
                    dir2.y += slope2.y;
                }
            }
        }
    }
    console.timeEnd("Measure")
    console.log({ ans1, ans2 })
}
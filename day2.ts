if (import.meta.main) {
    const text = await Deno.readTextFile("./input/day2.txt")
    const lines = text.split("\n");
    let ans = 0;

    const isValidLevel = (levels: number[]) => {
        const Diff = levels[1] - levels[0];
        for (let i = 1; i < levels.length; i++) {
            const currDiff = levels[i] - levels[i - 1];
            if (currDiff * Diff > 0) {
                if (Math.abs(currDiff) >= 1 && Math.abs(currDiff) <= 3) {
                    continue;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
        return true;
    };

    lines.forEach((line) => {
        const levels = line.split(' ').map((_) => parseInt(_, 10));
        if (isValidLevel(levels)) {
            ans++;
        } else {
            for (let i = 0; i < levels.length; i++) {
                if (isValidLevel([...levels.slice(0, i), ...levels.slice(i + 1)])) {
                    ans++;
                    break;
                }
            }
        }
    });

    console.log(ans);
}



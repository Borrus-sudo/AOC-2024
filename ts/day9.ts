// 24115582902498
if (import.meta.main) {
    const text = (await Deno.readTextFile("./input/day9.txt")).trim();
    let counter = 0;
    const disk: string[] = [];
    for (let pos = 0; pos < text.length; pos++) {
        const size = parseInt(text.at(pos) || "", 10);
        if (pos % 2 === 0) {
            disk.push(...Array(size).fill(counter.toString()))
            counter++;
        }
        else {
            disk.push(...".".repeat(size))
        }
    }
    let forwardIdx = 0;
    let backwardIdx = disk.length - 1;
    let checksum = 0n;
    // comment
    loop: while (forwardIdx < backwardIdx) {
        while (disk[forwardIdx] !== ".") {
            forwardIdx++;
            continue loop;
        }
        while (disk[backwardIdx] === ".") {
            backwardIdx--;
            continue loop;
        }
        disk[forwardIdx] = disk[backwardIdx];
        disk[backwardIdx] = '.';
        forwardIdx++;
        backwardIdx--;
    }
    let idx = 0n;
    for (const symbol of disk) {
        if (symbol !== ".") {
            checksum += (BigInt(symbol) * idx)
        }
        idx += 1n;
    }
    console.log(checksum);
}
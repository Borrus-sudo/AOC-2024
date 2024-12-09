// 24115582902498
if (import.meta.main) {
    const text = (await Deno.readTextFile("./input/day9.txt")).trim();
    console.time(
        "Benchmark"
    )
    let counter = 0;
    let checksum = 0n;
    let disk: number[] = [];
    const fileSizes: number[] = [];
    const fileIds: number[] = [];
    const fileIdx: number[] = [];
    let diskIdx = 0;
    for (let pos = 0; pos < text.length; pos++) {
        const size = parseInt(text.at(pos) || "", 10);
        if (pos % 2 === 0) {
            fileSizes.push(size)
            fileIds.push(counter)
            fileIdx.push(diskIdx)
            disk.push(...Array(size).fill(counter))
            counter++;
        }
        else {
            disk.push(...Array(size).fill(-1))
        }
        diskIdx += (size);
    }
    fileSizes.reverse();
    fileIds.reverse();
    fileIdx.reverse()

    let sizeIdx = 0;
    outerloop: for (let size of fileSizes) {
        const limit = disk.indexOf(fileIds[sizeIdx])
        loop: for (let idx = 0; idx <= (fileIdx[sizeIdx]); idx++) {
            if (disk[idx] === -1) {
                let spaceSize = 0;
                let cacheStart = idx;
                while (disk[idx] === -1) {
                    if (idx >= disk.length || idx >= limit)
                        break loop;
                    spaceSize++;

                    if (spaceSize === size) {
                        // let's goooooo
                        let id = fileIds[sizeIdx];
                        for (let j = fileIdx[sizeIdx]; j < (fileIdx[sizeIdx] + size); j++)
                            disk[j] = -1;
                        for (let i = cacheStart; i < (cacheStart + spaceSize); i++)
                            disk[i] = id;
                        sizeIdx++
                        continue outerloop;

                    }
                    idx++;
                }
            }
        }
        sizeIdx++;
    }

    let idx = 0n;
    for (const symbol of disk) {
        if (symbol !== -1) {
            checksum += (BigInt(symbol) * idx)
        }
        idx += 1n;
    }
    console.timeEnd(
        "Benchmark"
    )
    console.log(checksum);
}
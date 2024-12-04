function quicksort(arr: number[]): number[] {

    if (arr.length === 0 || arr.length === 1)
        return arr;
    if (arr.length === 2)
        return [Math.min(arr[0], arr[1]), Math.max(arr[0], arr[1])];

    const pivot = arr.length >> 1;
    const pivotVal = arr[pivot];
    const less: number[] = [], more: number[] = [], equal: number[] = [];
       
    for (const elem of arr)
        if (elem < pivotVal)
            less.push(elem)
        else if (elem > pivotVal)
            more.push(elem)
        else equal.push(elem)

    return [...quicksort(less), ...equal, ...quicksort(more)]
}

if (import.meta.main) {

    const text = await Deno.readTextFile("./input/day1.txt");
    const leftList: number[] = [], rightList: number[] = [];
     
    text.split('\n').forEach(line => {
        const [left, right] = line.split("  ");
        leftList.push(+left);
        rightList.push(+right)
    })

    /**
     * Part 1
     */

    const [sortedLeft, sortedRight] = [quicksort(leftList), quicksort(rightList)];
    let payload: number = 0;
    sortedLeft.forEach((elem, idx) => {
        payload += Math.abs(elem - sortedRight[idx]);
    })
    console.log(payload)

    /**
     * Part 2
     */
    const cache: Map<number, number> = new Map();
    for (let id of rightList) {
        if (cache.has(id))
            cache.set(id, (cache.get(id) || 0) + 1)
        else
            cache.set(id, 1)
    }
    let similarityScore = 0;
    for (let id of leftList)
        if (cache.has(id))
            similarityScore += (id * (cache.get(id) || 1))
    console.log(similarityScore);

}

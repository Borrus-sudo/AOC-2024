if (import.meta.main) {
    const text = await Deno.readTextFile("./input/day3.txt");
    console.log(text)
}
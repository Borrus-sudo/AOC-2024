if (import.meta.main) {
    const text = await Deno.readTextFile("./input/day7.txt");
    const lines = text.split("\n").map(_ => _.trim());
    const results: number[] = lines.map(_ => parseInt(_.split(":")[0].trim(), 10));
    const numbers: number[][] = lines.map(_ => (_.split(":")[1].trim().split(" ").map(_ => parseInt(_, 10))))

    let ans = 0;
    loop: for (let i = 0; i < numbers.length; i++) {
        let operands = numbers[i];
        let result = results[i]
        let counterStart = parseInt("2".repeat(numbers[i].length - 1), 3);
        while (counterStart >= 0) {
            let operators: string = counterStart.toString(3).padStart(numbers[i].length - 1, "0").replaceAll("1", "+").replaceAll('0', "*").replaceAll('2', ':')
            let thisResult = (operands[0]);
            for (let j = 1; j < operands.length; j++) {
                const correspondingOperator = operators[j - 1];
                if (correspondingOperator === "+")
                    thisResult += (operands[j]);
                else if (correspondingOperator === "*")
                    thisResult *= (operands[j])
                else
                    thisResult = parseInt(thisResult.toString() + operands[j].toString());
            }
            if (thisResult === (result)) {
                ans += result;
                continue loop;
            }
            counterStart--;
        }
    }
    console.log(ans)

}
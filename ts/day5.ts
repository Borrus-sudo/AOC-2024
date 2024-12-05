class Rules {
    LHS: number;
    RHS: number;
    RHSShown: boolean = false;
    constructor(payload: string) {
        [this.LHS, this.RHS] = payload.split("|").map(_ => parseInt(_, 10))
    }
    feedInputAndValidate(token: number): boolean {
        if (token === this.LHS && this.RHSShown) {
            return false;
        }
        if (token === this.RHS) {
            this.RHSShown = true;
        }
        return true;

    }
    reset() {
        this.RHSShown = false;
    }
    sort(LHSInput: number, RHSInput: number) {
        if (LHSInput === this.LHS && RHSInput === this.RHS) {
            return -1;
        }
        else if (RHSInput === this.LHS && LHSInput === this.RHS) {
            return 1;
        }
        return 0;
    }
}


if (import.meta.main) {
    const text = await Deno.readTextFile("./input/day5.txt");
    const rules: Rules[] = [], prints: string[] = [];
    const validPrints: number[][] = [];
    const invalidPrints: number[][] = [];
    let updateRules = true;
    text.split("\n").forEach((line) => {
        if (line.trim() === "") {
            updateRules = false;
            return;
        }
        if (updateRules) {
            rules.push(new Rules(line.trim()))
        }
        else {
            prints.push(line.trim())
        }
    })
    outer: for (const print of prints) {
        rules.forEach(rule => rule.reset())
        const parsedTokens = print.split(",").map(_ => parseInt(_, 10));
        for (const token of parsedTokens) {
            const all = rules.every(rule => rule.feedInputAndValidate(token))
            if (!all) {
                invalidPrints.push(parsedTokens)
                continue outer;
            }
        }
        validPrints.push(parsedTokens)
    }
    rules.forEach(rule => rule.reset())

    const validated = invalidPrints.map((print) => {
        // I know the array is mutated, chill dude
        return print.sort((a, b) => {
            for (const rule of rules) {
                if (rule.sort(a, b))
                    return rule.sort(a, b)
            }
            return 0;
        })
    })
    let ans1 = 0;
    let ans2 = 0;
    for (const print of validPrints) {
        ans1 += ((print.at(print.length >> 1)) || 0)
    }
    for (const print of validated) {
        ans2 += ((print.at(print.length >> 1)) || 0)
    }
    console.log({ ans1, ans2 })
}
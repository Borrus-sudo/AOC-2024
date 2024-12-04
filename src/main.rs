fn main() {
    let hello = "string";
    let input = std::fs::read_to_string("./input/day1.txt").unwrap();
    println!("{input} {hello}");
}
    
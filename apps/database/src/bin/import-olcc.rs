use itertools::Itertools;
use serde::Deserialize;
use strum::Display;

#[derive(Debug, Deserialize)]
#[serde(rename_all = "PascalCase")]
struct OlccItem {
    age: String,
    description: String,
    #[serde(rename = "New Item Code")]
    new_item_code: u64,
    proof: f32,
    size: OlccSize,
    #[serde(rename = "Unit Price")]
    unit_price: f32,
}

#[derive(Copy, Clone, Debug, Deserialize, Display, Eq, Ord, PartialEq, PartialOrd)]
enum OlccSize {
    #[serde(rename = "200 ML")]
    #[strum(serialize = "200 ML")]
    TwoHundredMl,
    #[serde(rename = "375 ML")]
    #[strum(serialize = "375 ML")]
    ThreeSevenFiveMl,
    #[serde(rename = "50 ML")]
    #[strum(serialize = "50 ML")]
    FiftyMl,
    #[serde(rename = "750 ML")]
    #[strum(serialize = "750 ML")]
    SevenFiftyMl,
    #[serde(rename = "LITER")]
    #[strum(serialize = "LITER")]
    Liter,
    #[serde(rename = "1.75 L")]
    #[strum(serialize = "1.75 L")]
    OnePointSevenFiveLiter,
}

fn main() {
    let mut reader = csv::Reader::from_reader(std::io::stdin());
    let (successes, failures): (Vec<_>, Vec<_>) = reader
        .deserialize()
        .map(|result| {
            let record: Result<OlccItem, csv::Error> = result;
            record
        })
        .partition_result();

    let is_success = failures.is_empty();
    for failure in failures {
        eprintln!("{failure}");
    }

    let groups = successes
        .iter()
        .group_by(|record| record.description.clone());

    for (description, group) in &groups {
        let sizes = group.map(|record| record.size).max().unwrap(); // must have deserialized enums
        println!("{}: {}", description, sizes);
    }

    if !is_success {
        std::process::exit(1);
    }
}

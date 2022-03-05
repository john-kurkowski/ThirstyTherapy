# Thirsty Therapy Database

This folder contains code to interface with the consulting business's database
of cocktails.

## `import-olcc`

> ⚠️ **TODO**: the database schema and therefore format of this script is still
> under construction.

```zsh
$ cargo run --bin import-olcc < /path/to/NumericPriceListCurrentMonth.csv
```

Validates the OLCC CSV given on stdin, and prints to stdout a CSV suitable to
bootstrap our Airtable ingredients database. Omits ingredient rows we aren't
interested in (e.g. smaller bottles which are more expensive by volume). Exits
with an error code if _any_ input or output row didn't validate.

**TODO:** upsert ingredients into our existing Airtable ingredients database.

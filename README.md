# Airtable Lambda Example

## Installation

First, install and configure [up](https://up.docs.apex.sh/).

Then clone repo and setup your Airtable API key and base id in `up.json`

```shell
git clone https://github.com/stepankuzmin/airtable-lambda.git
cd airtable-lambda
cp example.up.json up.json
```

## Deploy

```shell
up
```

## Usage

This will create a record with `Name` and `Notes` in `Table 1` table of specified `AIRTABLE_BASE` base.

```shell
curl -X POST -d '{"Name": "", "Notes": "" }' `up url`/Table%201
```

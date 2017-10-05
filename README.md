# Thank Tank

A simple React App which displays thanks from a Google Spreadsheet.
It use Google oAuth to allow writing into the spreadsheet (for likes).
Nothing secure prevent somebody to vote a gazillion times, you’ve been warned.

Spreadsheet should respect the following column order:

1. Timestamp
1. email adress / name
1. thanked to
1. message
1. secret

Use the first row for labels, data will load from 2nd row.

An example can be found [here](https://docs.google.com/spreadsheets/d/1JBJQDopPqTYgTf_Xt6ZpwVF5WdOrD-yEnz18mHUGv54/edit#gid=0).

## Config

Copy the example config file:

```
cp src/config.example.js src/config.js
```

Fill-in the fields with your own settings. You can create an app and generate a
Client-ID on [console.developers.google.com/apis](https://console.developers.google.com/apis/).

## Work

```
npm start
```

## Build

```
npm run build
```

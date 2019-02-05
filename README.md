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

Make sure that the spreadsheet has been setup with the correct permissions (either locked to the users API key or open to all
Thoughtworks)

## Best setup

The best way to use this app is to setup a Google form which then dumps it's responses into a Google sheet, use this sheet
to populate this app. The link to the Google form can then be made available to guests (or posted on the Local Office Day app).
An example of a form can be found [here](https://docs.google.com/forms/d/126EQUHAcG9Tmp6VN4RuUAEZB9KrqVjOSg5WPPL5tPaU/edit?usp=sharing).

Make sure that the form has been setup with the correct permissions (either locked to the users API key or open to all
Thoughtworks)

## Config

Copy the example config file and fill in appropriately:

```
cp src/config.example.js src/config.js
```

Fill-in the fields with your own settings. You can create an app and generate a
Client-ID on [console.developers.google.com/apis](https://console.developers.google.com/apis/).
The API key can be retrieved from the 'Credentials' section and looks like: 
'<unique-string>.apps.googleusercontent.com'

## Work

```
npm install
```

```
npm start
```

## Build

```
npm run build
```

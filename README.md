# nft-backend

create the following folders

- data
- processed-data in the folder

Put the source CSV's in the data folder

Create .env file in the root folder with the following keys

```javascript
PORT=7000
DATABASE_URL=mongodb://localhost:27017/translations
```

Run the following command to create the translation json
`npm run parser`

Install mongodb locally

Run the following command to push the data to the database
`npm run db`

Run the following command to start the server
`npm run dev`

For results hit the API where last digit is the page
`localhost:7000/api/v1/translations/0`

The whole server is written using typescript following MVC architecture. The parser script is well commented
and the complexity of each action is also shown side by side.

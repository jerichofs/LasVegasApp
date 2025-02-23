# LasVegasApp

## Server
In order to run the server go to the /server folder and use the command

1. Install packages

```sh
npm i
```

2. To run the server
```sh
npm run start
```

3. The server will be available on `localhost:3000` by default for additional variables use `.env`

### API docs

- **POST /start** - Starts the game session with 10 credits
- **POST /play** - API to play the game with deduce -1 and cheat logic
- **POST /cashout** - API to cash out credits to account and ends the session
- **POST /twist** - API that gives the ability with 50% change to double the credits or loose them in half, the action available only once per session


## Client
In order to run the client go to the /client folder and use the command

1. Install packages

```sh
npm i
```

2. To run the client
```sh
npm run start
```

3. The client will be available on `localhost:3001` by default for additional variables use `.env`



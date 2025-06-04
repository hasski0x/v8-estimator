# v8-estimator

Simple example app showing an estimator tool.

## Server

```
cd server
npm install
npm start
```

The API will be available on `http://localhost:3001/api/estimate`.

The server also provides `/api/login` which expects a username and password
defined in `.env` (see `.env.example`). Include the returned token in the
`Authorization` header when calling `/api/estimate`.

## Client

Open `client/index.html` in a browser. The form will calculate the square
metres in real time and send a request to the server when submitted.
You must log in first to receive a token used for estimates.

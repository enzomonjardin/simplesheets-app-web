## 📄 simplesheets app web

This is the simplesheets web client project. It's a simple create-react-app project, using typescript, apollo-client, tailwindcss and styled-components for styling the UI.

## Getting started

You can configure the simplesheet-server url by updating the .env file. It's currently set to http://localhost:4000 , the default url when running the server locally.

To install all dependencies

```
 npm install
```

To start in development mode

```
npm run start
```

## Routes

There's two available routes:

- `/` will create a new sheet and redirect you to it
- `/:sheetId` to see and edit a sheet

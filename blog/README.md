# Simple Blog App
A full stack blog app crafted with RemixJS and Prisma ORM, fueled by a PostgreSQL database

## Development

### Install dependancies
```
   npm install
```

## database
Using postgreSQL
```
   npx prisma generate
```
```
   npx prisma migrate dev
```

### Running the app

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`

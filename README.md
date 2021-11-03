# Multilingual Mutli-user Blog (WIP)

This app is built using Next.js and tailwind. MongoDB is being used to save the data.

## Overview:

The app home page shows the articles saved in database with the key 'lang' set to the current Locale choice of user.

Locale can be toggled from the navigation menu. Currently, the app supports English(EN), Hindi(HI) and Italian(IT). This Next.js app uses builtin support for International Routing to implement the multiple sub-paths.

To write and publish an article, the user needs to sign in. If the account doesn't already exist, the option to sign up is also there.

Article Editing is currently not supported.

## Set up the project:

Follow this:

1. Create collections in your MongoDB Database named 'articles' and 'users'.
2. Set up .env with variables 'DB_URI' and 'DB_NAME', providing the link to connect to database and the name of your database respectively.
3. Install the dependencies

## API:

Following routes are available to access the data:

_/api/articles_:
GET: Read all articles
POST: Save a new article

_/api/articles/[lang]_:
GET: Read all articles of a particular language

_/api/article/[slug]_:
GET: Read a single article using 'slug' value as parameter

_/api/user_:
POST: Add a new user

_/api/auth/[email]_:
GET: Check if a user already exists using 'email' as parameter

_/api/auth_:
POST: Send credits object with 'email' and 'password' to login a user.

## Run the project:

The project can be run in development mode using script **npm run dev**. Open the browser with link [http://localhost:3000](http://localhost:3000) to view the app.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import client from '../../../lib/mongodb'

export default async function auth (req, res) {
  return await NextAuth(req, res, {
    adapter: MongoDBAdapter({
      db: (await client).db(process.env.DB_NAME)
    }),
    providers: [
      GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      })
      /*       EmailProvider({
        server: {
          host: process.env.EMAIL_SERVER_HOST,
          auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD
          }
        },
        from: process.env.EMAIL_SERVER_USER
      }) */
    ],
    database: process.env.DB_URI
  })
}

/*
import { readUserByEmail } from '../../../models/users'

export default async function (req, res) {
  const email = req.query
  const user = await readUserByEmail(email)
  user ? res.send(true) : res.send(false)
} */

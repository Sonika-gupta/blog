const { MongoClient } = require('mongodb')

const client = new MongoClient(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

async function readUser () {
  await client.connect()
  const user = await client
    .db(process.env.DB_NAME)
    .collection('users')
    .findOne()
    .toArray()
  client.close()
  console.log('user', user)
  return user
}

async function createUser (user) {
  await client.connect()
  const addedUser = await client
    .db(process.env.DB_NAME)
    .collection('users')
    .insert(user)
  client.close()
  console.log('user', addedUser)
  return addedUser
}

module.exports = {
  readUser,
  createUser
}

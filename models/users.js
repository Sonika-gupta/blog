const { MongoClient } = require('mongodb')

const client = new MongoClient(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

async function queryDb (query, data) {
  let value
  await client.connect()
  const collection = await client.db(process.env.DB_NAME).collection('users')

  switch (query) {
    case 'create':
      value = await collection.insertOne(data)
      break

    case 'read':
      value = await collection.find().toArray()
      break

    case 'authenticate':
      const user = await collection.findOne({ email: data.email })
      value = user.password === data.password ? user : null
      break

    case 'readOne':
      value = await collection.findOne(data)
      break

    default:
      console.log('reached default!')
      break
  }
  client.close()
  console.log('model value user', value)
  return value
}

function readUsers () {
  return queryDb('read')
}

async function createUser (user) {
  const ack = await queryDb('create', user)
  return ack.insertedCount && user
}

function readUserByEmail (email) {
  return queryDb('readOne', email)
}

function authenticateUser (creds) {
  return queryDb('authenticate', creds)
}

module.exports = {
  readUsers,
  createUser,
  readUserByEmail,
  authenticateUser
}

import client from '../lib/mongodb'

async function queryDb (query, data) {
  console.log(data)
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
      value = user
        ? user.password === data.password
          ? user
          : { error: 'Incorrect Password' }
        : { error: 'Email Not Registered. Please Sign Up.' }
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
  return ack.insertedId && user
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

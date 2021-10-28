const { MongoClient } = require('mongodb')

const client = new MongoClient(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

async function readPosts () {
  await client.connect()
  const posts = await client
    .db(process.env.DB_NAME)
    .collection('blogposts')
    .find()
    .toArray()
  client.close()
  console.log('posts', posts)
  return posts
}

module.exports = {
  readPosts
}

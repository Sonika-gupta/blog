const { MongoClient } = require('mongodb')

const client = new MongoClient(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

export default client.connect()

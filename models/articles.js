const { MongoClient } = require('mongodb')

const client = new MongoClient(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

async function readArticles () {
  await client.connect()
  const articles = await client
    .db(process.env.DB_NAME)
    .collection('articles')
    .find()
    .toArray()
  client.close()
  return articles
}

async function readArticlesByLang ({ lang }) {
  await client.connect()
  const articles = await client
    .db(process.env.DB_NAME)
    .collection('articles')
    .find({ lang })
    .toArray()
  client.close()
  return articles
}

async function readArticleBySlug ({ slug }) {
  await client.connect()
  const article = await client
    .db(process.env.DB_NAME)
    .collection('articles')
    .findOne({ slug })

  console.log('readArticlebyslug', slug, article)
  client.close()
  return article
}

async function createArticle (article) {
  await client.connect()
  const ack = await client
    .db(process.env.DB_NAME)
    .collection('articles')
    .insertOne(article)
  client.close()
  return ack.insertedId ? article : null
}

module.exports = {
  readArticles,
  readArticlesByLang,
  readArticleBySlug,
  createArticle
}

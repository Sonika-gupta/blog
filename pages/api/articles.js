import { createArticle, readArticles } from '../../models/articles'

export default async function handler (req, res) {
  try {
    if (req.method === 'GET') {
      const articles = await readArticles()
      articles ? res.json(articles) : res.send({ error: 'Not found' })
    } else if (req.method === 'POST') {
      const article = await createArticle(req.body)
      article ? res.json(article) : res.send({ error: 'Could Not Publish' })
    }
  } catch (err) {
    res.status(500).send({ error: err })
  }
}

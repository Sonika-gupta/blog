import { readArticlesByLang } from '../../../models/articles'

export default async function handler (req, res) {
  try {
    const articles = await readArticlesByLang(req.query)
    console.log(articles)
    articles ? res.json(articles) : res.send({ error: 'Not found' })
  } catch (err) {
    res.status(500).send({ error: err })
  }
}

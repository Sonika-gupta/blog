import { readArticleBySlug } from '../../../models/articles'

export default async function handler (req, res) {
  console.log('inside handler')
  const slug = req.query
  console.log(slug)
  try {
    const article = await readArticleBySlug(slug)
    article ? res.json(article) : res.send({ error: 'Not found' })
  } catch (err) {
    res.status(500).send({ error: err })
  }
}

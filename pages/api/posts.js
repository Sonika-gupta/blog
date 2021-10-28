import { readPosts } from '../../models/posts'

export default async function handler (req, res) {
  try {
    if (req.method == 'GET') {
      const posts = await readPosts()
      posts ? res.json(posts) : res.send({ error: 'Not found' })
    } else res.send('Post method coming soon')
  } catch (err) {
    res.status(500).send({ error: err })
  }
}
/*
export default async function getPosts (req, res) {
  try {
    const posts = await readPosts()
    console.log(posts)
    res.json({ posts: posts.length })
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
} */

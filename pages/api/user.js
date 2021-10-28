import { createUser, readUser } from '../../models/users'

export default async function handler (req, res) {
  try {
    if (req.method == 'GET') {
      const user = await readUser()
      user ? res.json(user) : res.send({ error: 'Not found' })
    } else if (req.method === 'POST') {
      const user = await createUser(req.body)
      user ? res.json(user) : res.send({ error: 'Not found' })
    }
  } catch (err) {
    res.status(500).send({ error: err })
  }
}

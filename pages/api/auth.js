import { authenticateUser } from '../../models/users'

export default async function handler (req, res) {
  try {
    const user = await authenticateUser(req.body)
    // TODO: EXPAND ON PROVIDING EXACT LOGGING IN ERROR
    user ? res.json(user) : res.send({ error: 'Authentication Failed' })
  } catch (err) {
    console.log(err)
    res.status(500).send({ error: err })
  }
}

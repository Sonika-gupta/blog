import { readUserByEmail } from '../../../models/users'

export default async function (req, res) {
  const email = req.query
  const user = await readUserByEmail(email)
  console.log(user)
  user ? res.send(true) : res.send(false)
}

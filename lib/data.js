/* import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
 */
async function getAllArticles (lang) {
  /*  const contentDirectory = path.join(process.cwd(), '_content', lang)
  const allArticles = fs.readdirSync(contentDirectory)

  console.log('getting files from', contentDirectory) */
  const res = await fetch('http://localhost:3000/api/posts', {
    method: 'GET'
  })
  const allArticles = await res.json()
  console.log('articles', allArticles)
  return allArticles.error ? [] : allArticles
  /*
  return allArticles.map(filename => {
    const slug = filename.replace('.md', '')
    const file = fs.readFileSync(path.join(contentDirectory, filename), 'utf-8')
    const { data, content } = matter(file)
    return {
      data,
      content,
      slug
    }
  }) */
}

/* function getArticleBySlug (lang, slug) {
  const pathname = path.join(process.cwd(), '_content', lang, `${slug}.md`)
  const file = fs.readFileSync(pathname, 'utf-8')
  const { data, content } = matter(file)
  return {
    data,
    content,
    slug
  }
} */

async function addUser (user) {
  console.log(user)
  // TODO: validate inputs
  // test if user exists
  const res = await fetch('http://localhost:3000/api/user', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const newUser = await res.json()
  console.log('user created', newUser)
  return newUser
}

export { getAllArticles, addUser }

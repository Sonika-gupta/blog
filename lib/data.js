/* import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
 */

async function fetchData (route, data, method = 'GET') {
  const res = await fetch('http://localhost:3000/api/' + route, {
    method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const value = await res.json()
  if (value.error) {
    console.log(value.error)
  }
  return value
}

async function getAllArticles (lang) {
  const value = await fetchData('posts')
  return value.error ? [] : value
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

function addUser (user) {
  console.log('posting', user)
  // TODO: validate inputs
  // test if user exists
  return fetchData('user', user, 'POST')
}

function authenticateEmail (email) {
  return fetchData(`auth/${email}`)
  // TODO: AUTHORISE/VERIFY THROUGH EMAIL LINK IF USER DOESNT EXIST
}

function authenticateUser (creds) {
  return fetchData('auth', creds, 'POST')
}

export { getAllArticles, addUser, authenticateEmail, authenticateUser }

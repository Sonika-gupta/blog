import { server } from '../config'

async function fetchData (route, data, method = 'GET') {
  const res = await fetch(`${server}/api/${route}`, {
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
  const value = await fetchData(lang ? `articles/${lang}` : 'articles')
  return value.error ? [] : value
}

async function getArticleBySlug (slug) {
  console.log('getArticleBySlug', slug)
  const value = await fetchData(`article/${slug}`)
  return value.error ? {} : value
}

function addArticle (article) {
  return fetchData('articles', article, 'POST')
}

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

export {
  getAllArticles,
  getArticleBySlug,
  addArticle,
  addUser,
  authenticateEmail,
  authenticateUser
}

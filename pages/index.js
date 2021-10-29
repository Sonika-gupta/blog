import { data } from 'autoprefixer'
import Head from 'next/head'
import Link from 'next/link'
import { test } from 'gray-matter'
import useTranslation from '../hooks/useTranslation'
import { getAllArticles } from '../lib/data'

export default function Home ({ articles }) {
  const { translate } = useTranslation()

  return (
    <div>
      <Head>
        <title>Blog</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <p>
          {translate('count')}: {articles.length}
        </p>
        <ul>
          {articles.length ? (
            articles.map(item => <BlogListItem key={item.slug} {...item} />)
          ) : (
            <div className='text-gray-500 text-sm h-full'>
              <p className='align-middle'>{translate('zeroArticles')}</p>
            </div>
          )}
        </ul>
      </main>
    </div>
  )
}

function BlogListItem ({ locale, slug, title, date, content }) {
  return (
    <Link href={`/${locale}/blog/${slug}`}>
      <li className='border-gray-200 border-2 rounded-md p-4 my-3 shadow hover:shadow-lg space-y-1 cursor-pointer'>
        <h5 className='text-xl text-blue-700'>{title}</h5>
        <div className='text-sm text-gray-600'>{date}</div>
        <p className='truncate'>{content}</p>
      </li>
    </Link>
  )
}

export async function getStaticProps ({ locale }) {
  const articles = await getAllArticles(locale)
  return {
    props: {
      articles
    }
  }
}

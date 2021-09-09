import Head from 'next/head'
import Link from 'next/link'
import { blogPosts } from '../lib/data'

export default function Home () {
  return (
    <div>
      <Head>
        <title>Blog</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <ul>
          {blogPosts.map(item => (
            <BlogListItem key={item.slug} {...item} />
          ))}
        </ul>
      </main>
    </div>
  )
}

function BlogListItem ({ slug, title, date, content }) {
  return (
    <Link href={`/blog/${slug}`}>
      <li className='border-gray-200 border-2 rounded-md p-4 my-3 shadow hover:shadow-lg space-y-1 cursor-pointer'>
        <h5 className='text-xl text-blue-700'>{title}</h5>
        <div className='text-sm text-gray-600'>{date}</div>
        <p className='truncate'>{content}</p>
      </li>
    </Link>
  )
}

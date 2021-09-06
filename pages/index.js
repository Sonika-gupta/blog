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
        <h1>My Blog</h1>
      </main>

      <ul>
        {blogPosts.map(item => (
          <li key={item.slug}>
            <Link href={`/blog/${item.slug}`}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
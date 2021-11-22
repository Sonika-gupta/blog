import { useReducer, useState } from 'react'
import { useRouter } from 'next/router'
import { addArticle } from '../lib/data'
import useTranslation from '../hooks/useTranslation'
import styles from '../styles/ArticleForm.module.css'
import dynamic from 'next/dynamic'
import remarkGfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown'

const initForm = { title: '', slug: '', content: '', lang: '' }

export default function ArticleForm () {
  // const [notif, setNotif] = useState('')
  const { locale } = useRouter()
  const { translate } = useTranslation()
  const [form, setForm] = useReducer(
    (state, newState) => ({
      ...state,
      ...newState
    }),
    initForm
  )

  async function publish (e) {
    console.log('submitting', form)
    e.preventDefault()
    form.lang = locale
    const article = {
      ...form,
      date: new Date().toLocaleString('en-US', {
        dateStyle: 'long',
        timeStyle: 'short'
      })
    }
    if (!article.title || !article.content) {
      alert('Add Content First!')
    } else {
      const added = await addArticle(article)
      added.error
        ? alert(added.error)
        : (alert('Article Published'), setForm(initForm))
    }
  }

  return (
    <div className='max-w-screen-lg m-auto'>
      <h3 className='text-lg text-gray-500 font-semibold my-6 text-center'>
        {translate('new article')}
      </h3>

      <form onSubmit={publish}>
        <div>
          <div className='floating-input mb-5 relative'>
            {/* <label className={styles.label} htmlFor='title'>
              {translate('title')}
            </label> */}
            <input
              type='text'
              name='title'
              value={form.title}
              onChange={e => setForm({ title: e.target.value })}
              className={styles.input}
              placeholder={translate('title')}
            />
          </div>
          <div className='m-1 flex w-full'>
            {/* <label className={styles.label} htmlFor='slug'>
              {translate('slug')}
            </label> */}
            <input
              name='slug'
              value={form.slug}
              onChange={e => setForm({ slug: e.target.value })}
              className={styles.input}
              placeholder={translate('slug')}
            />
          </div>
        </div>
        <div className='w-full'>
          {/*  <label className={styles.label} htmlFor='content'>
            {translate('article')}
          </label> */}
          <textarea
            onChange={e => setForm({ content: e.target.value })}
            value={form.content}
            name='content'
            className={styles.text}
            placeholder='Start Writing Here..'
          />
        </div>
        <button
          type='submit'
          className='float-right font-semibold py-1 px-4 rounded bg-blue-800 text-white mt-2.5'
        >
          {translate('publish')}
        </button>
        <div className='border-2 border-gray-200 outline-none w-full box-border min-h-300 mx-2.5 p-4'>
          {/*  <label className={styles.label} htmlFor='content'>
            {translate('preview')}
          </label> */}
          <div className='prose overflow-x-auto'>
            <ReactMarkdown
              children={form.content}
              remarkPlugins={[remarkGfm]}
            />
          </div>
        </div>
      </form>
    </div>
  )
}

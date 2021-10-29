import { useReducer, useState } from 'react'
import dynamic from 'next/dynamic'
import { addArticle } from '../lib/data'
import { getStaticProps } from '.'
import { useRouter } from 'next/router'
import useTranslation from '../hooks/useTranslation'

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>
})

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
    e.preventDefault()
    console.log('submitting', form)
    form.lang = locale
    const article = {
      ...form,
      date: new Date().toLocaleString('en-US', {
        dateStyle: 'long',
        timeStyle: 'short'
      })
    }
    const added = await addArticle(article)
    added.error
      ? alert(added.error)
      : (alert('Article Published'), setForm(initForm))
  }

  return (
    <>
      <h3 className='text-lg text-gray-500 font-semibold my-6 text-center'>
        {translate('new article')}
      </h3>
      <form onSubmit={publish}>
        <div className='m-2 flex w-full'>
          <label htmlFor='title'>{translate('title')}</label>
          <input
            type='text'
            name='title'
            value={form.title}
            onChange={e => setForm({ title: e.target.value })}
            className='border-2 border-gray-200 rounded-md outline-none w-full box-border h-10 p-2 mx-3.5'
          />
        </div>
        <div className='m-2 flex w-full'>
          <label htmlFor='slug'>{translate('slug')}</label>
          <input
            name='slug'
            value={form.slug}
            onChange={e => setForm({ slug: e.target.value })}
            className='border-2 border-gray-200 rounded-md outline-none w-full box-border h-10 p-2 mx-3.5'
          />
        </div>
        <div className='mt-2'>
          <ReactQuill
            value={form.content}
            name='content'
            theme='snow'
            onChange={value => setForm({ content: value })}
          />
        </div>
        <button
          type='submit'
          className='float-right font-semibold py-1 px-4 rounded bg-blue-800 text-white mt-2.5'
        >
          {translate('publish')}
        </button>
      </form>
    </>
  )
}

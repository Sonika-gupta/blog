export default function Error ({ message }) {
  return (
    <div className='h-10 w-full'>
      <span className='text-xs text-red-500'>{message}</span>
    </div>
  )
}

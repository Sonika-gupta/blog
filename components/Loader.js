const Loader = () => {
  let circleCommonClasses = 'h-2.5 w-2.5 bg-green-500 rounded-full'

  return (
    <div className='absolute z-20 top-1/2 w-full mx-auto flex'>
      <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
      <div className={`${circleCommonClasses} mr-1 animate-bounce200`}></div>
      <div className={`${circleCommonClasses} animate-bounce400`}></div>
    </div>
  )
}

export default Loader

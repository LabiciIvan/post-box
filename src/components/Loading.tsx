const Loading = ({text}: {text:string}): React.ReactNode => {

  return (
    <div className='loading'>
      {text}
    </div>
  )
}

export default Loading;
import emptyImage from '../assets/empty.png';

const NotFound = ({text} : {text:string}): React.ReactNode => {

  return (
    <div className='not-found'>
      <img src={emptyImage} alt='Not found image' />
      <h4>{text}</h4>
    </div>
  )
}

export default NotFound;
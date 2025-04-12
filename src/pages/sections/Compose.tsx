import ReadWriteEmail from '../../components/ReadWriteEmail';
import { Email } from '../../types';

const Compose = () => {

  const emailTemplate: Email = {
    id: crypto.randomUUID(),
    timestamp: '',
    cc: [],
    sender: {
      id: 0,
      name: '',
      email: '',
    },
    receiver: [{
      email: '',
    }],
    title: '',
    message:'',
    emailRead: false,
    fontSize: '16',
    fontType: 'Nunito'
  }

  return (
    <div className='compose-section'>
      <ReadWriteEmail email={emailTemplate} composeOrDraft='compose'/>
    </div>
  )
}

export default Compose;

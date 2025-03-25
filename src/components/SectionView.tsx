import { useContext } from 'react'
import { ViewSectionContext } from '../context/ViewSectionContext'
import { SectionViewType } from '../types';
import Inbox from '../pages/sections/Inbox';
import Draft from '../pages/sections/Draft';
import Compose from '../pages/sections/Compose';
import Delete from '../pages/sections/Delete';
import Sent from '../pages/sections/Sent';
import Results from '../pages/Results';


const SectionView = () => {

  const sectionComponents: SectionViewType[] = [
    {
      title: 'compose',
      component: <Compose />
    },
    {
      title: 'inbox',
      component: <Inbox />
    },
    {
      title: 'draft',
      component: <Draft />
    },
    {
      title: 'deleted',
      component: <Delete />
    },
    {
      title: 'sent',
      component: <Sent />
    },
    {
      title: 'results',
      component: <Results />
    }
  ];

  const viewSection = useContext(ViewSectionContext);

  const { title } =  viewSection;

  const renderView: React.ReactNode = sectionComponents.filter(element => element.title === title)[0].component;
  
  return (
    <div className='section-view'>
      { renderView }
    </div>
  )
}

export default SectionView;
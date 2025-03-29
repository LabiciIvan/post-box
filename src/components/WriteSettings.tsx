import { useContext, useState } from "react";
import FontContext from "../context/FontContext";
import { ComposeOrDraftType, Email, FontTypes } from "../types";

const WriteSettings = ({email, composeOrDraft}: {composeOrDraft: ComposeOrDraftType, email: Email}): React.ReactNode => {

  const [enableFontSizeChange, setEnableFontSizeChange] = useState<boolean>(false);

  // Context for FontContex
  const fontContext = useContext(FontContext);

  const {fontSize, fontType, changeSize, changeType} = fontContext;

  const changeFontType = (type: FontTypes): void => {
    changeType(type);

    if (composeOrDraft === 'draft') {
      email.fontType = type;
    }
  }

  const changeFontSize = (size: string): void => {
    changeSize(size);
    setEnableFontSizeChange(false);

    if (composeOrDraft === 'draft') {
      email.fontSize = size;
    }
  }

  return (
    <div className='write-settings'>
        <div className='option'>
          <i className='bi bi-arrow-return-left' />
        </div>

        <div className='option'>
          <i className='bi bi-arrow-return-right' />
        </div>

        <div className='option'>
          <select className='option-select-font' onChange={(e: React.ChangeEvent<HTMLSelectElement>) => changeFontType(e.target.value as FontTypes)} value={composeOrDraft === 'draft' ? email.fontType : fontType}>
            <option value='Nunito'>Nunito</option>
            <option value='Inter'>Inter</option>
            <option value='Roboto'>Roboto</option>
            <option value='Lato'>Lato</option>
            <option value='Open Sans'>Open Sans</option>
            <option value='Montserrat'>Montserrat</option>
            <option value='Source Sans Pro'>Source Sans Pro</option>
            <option value='Pacifico'>Pacifico</option>
          </select>
        </div>

        <div className='option'>
          <i className='bi bi-fonts' onClick={() => setEnableFontSizeChange(prev => !prev)}/>
          <div className={`font-sizes ${enableFontSizeChange && 'enabled'}`}>
            <span onClick={() => changeFontSize('12')}>12px</span>
            <span onClick={() => changeFontSize('14')}>14px</span>
            <span onClick={() => changeFontSize('16')}>16px</span>
            <span onClick={() => changeFontSize('18')}>18px</span>
            <span onClick={() => changeFontSize('20')}>20px</span>
            <span onClick={() => changeFontSize('22')}>22px</span>
          </div>
        </div>

        <div className='option'>
          <i className='bi bi-type-bold' />
        </div>

        <div className='option'>
          <i className='bi bi-type-italic' />
        </div>

        <div className='option'>
          <i className='bi bi-type-underline' />
        </div>

    </div>
  )
}

export default WriteSettings;
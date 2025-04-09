import { createContext, useState } from "react";
import { FontInterface, FontTypes } from "../types";

const FontContext = createContext<FontInterface>({
  fontSize: '16',
  fontType: 'Nunito',
  changeSize: (size: string) => {},
  changeType: (font: FontTypes) => {},
});


const FontContextProvider = ({children}:{children:React.ReactNode}): React.ReactNode => {

  const [fontSize, setFontSize] = useState<string>('16');

  const [fontType, setFontType] = useState<FontTypes>('Nunito');

  const changeSize = (size: string) => {
    setFontSize(() => size);
  }

  const changeType = (font: FontTypes) => {
    setFontType(() => font);
  }

  return (
    <FontContext.Provider value={{ fontSize, fontType, changeSize, changeType }}>
      {children}
    </FontContext.Provider>
  )
}

export default FontContext;

export {
  FontContextProvider
}
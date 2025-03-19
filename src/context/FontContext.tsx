import { createContext, useState } from "react";
import { FontInterface, FontTypes } from "../types";

const FontContext = createContext<FontInterface>({
  fontSize: '18',
  fontType: 'Inter',
  changeSize: (size: string) => {},
  changeType: (font: FontTypes) => {},
});


const FontContextProvider = ({children}:{children:React.ReactNode}): React.ReactNode => {

  const [fontSize, setFontSize] = useState<string>('18px');

  const [fontType, setFontType] = useState<FontTypes>('Inter');

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
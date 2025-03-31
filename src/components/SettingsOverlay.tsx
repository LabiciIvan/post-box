const SettingsOverlay = ({children, onApplyChange, onCloseOverlay}:{children:React.ReactNode, onApplyChange: () => void, onCloseOverlay: () => void}): React.ReactNode => {

  return (
    <div className='settings-overlay'>
      <div className='content'>
        <button onClick={onCloseOverlay}>close</button>
        {children}
      </div>
    </div>
  )
}

export default SettingsOverlay;
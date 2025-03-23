import { useEffect, useRef, useState } from 'react'
import { NotificationsTypes } from '../types'

const NotificationsBadge = ({messages, status, onCloseNotification}:{messages: string[], status: NotificationsTypes, onCloseNotification: () => void}): React.ReactNode => {

  const TIMEOUT_TIME = 8000;
  
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isFading, setIsFading] = useState<boolean>(false);

  const startNotificationClear = () => {
    setIsFading(() => true);
    clearTimeout(timeoutRef.current as ReturnType<typeof setTimeout>);

    timeoutRef.current = setTimeout(() => {
      onCloseNotification();
    }, TIMEOUT_TIME);
  };


  const cancelNotificationClear = () => {
    setIsFading(() => false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    // Start the timeout when the component mounts
    startNotificationClear();

    return () => {
      // Cleanup the timeout when the component unmounts
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  return (
    <div
      className={`notifications-badge _${status} ${isFading ? '_fade' : '_not_fade'}`}
      onMouseEnter={cancelNotificationClear}
      onMouseLeave={startNotificationClear}
    >
      {
        messages.map(text => <span >{text}</span>
        )
      }
    </div>
  )
}

export default NotificationsBadge
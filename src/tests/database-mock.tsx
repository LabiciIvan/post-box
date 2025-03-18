import { isUserLoggedIn } from '../hooks/Auth';
import { User, UserNotFoundErrorType, Email, InboxType, GeneralFetchError, InboxTypeKeys } from '../types';

import { users, inboxData } from './data';

// import Bill from '../assets/Bill.jpeg';
// import Joe from '../assets/Joe.jpg';

// Default server delay time 2 seconds
const DEFAULT_DELAY_TIME_LONG = 1500;
const DEFAULT_DELAY_TIME_SHORT = 800;

const UNIQUE_STORAGE_NAME = 'post-box-storage-emails';

const syncApplicationLocalStorage= (ownerID: number): void => {

  // Get the dummy data
  const dummyUserInbox: InboxType[] = inboxData.filter(data => data.belongsTo === ownerID);

  const { inbox, draft, sent, deleted } = dummyUserInbox[0];

  inbox.forEach(i => {
    insertEmailInLocalStorage(i, ownerID, 'inbox');
  });

  draft.forEach(i => {
    insertEmailInLocalStorage(i, ownerID, 'draft');
  });

  sent.forEach(i => {
    insertEmailInLocalStorage(i, ownerID, 'sent');
  });

  deleted.forEach(i => {
    insertEmailInLocalStorage(i, ownerID, 'deleted');
  });
}

const fetchUser = (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {

      const user:User | false = users.filter(u => u.email === email)[0] || false;

      const passwordMatch: User = users.filter(u => u.password === password)[0] || null;

      const error: UserNotFoundErrorType = {
        email: '',
        password: '',
      };

      if (!user) {
        error.email = 'User not found';
        reject(error);
      }

      if (!passwordMatch) {
        error.password = 'Password is incorrect';
        reject(error);
      }

      if (user) {
        resolve(user);
      }

    }, DEFAULT_DELAY_TIME_LONG);
  })
}

const fetchInbox = (ownerID: number): Promise<InboxType> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // const userInbox:InboxType | false = inboxData.filter(userInbox => userInbox.belongsTo === ownerID)[0] || false;
      const userInbox:InboxType = getEmailFromLocalStorage(ownerID)[0];

      const error: GeneralFetchError = {
        error: 'Error fetchInbox() function, not available for this user.'
      }

      if (!userInbox) {
        reject(error);
      }

      resolve(userInbox);
    }, DEFAULT_DELAY_TIME_SHORT);
  })
}

const insertEmailInLocalStorage = (email: Email, ownerId: number, category: keyof InboxTypeKeys): void => {
  const CATEGORY    = category;
  const UNIQUE_KEY  = UNIQUE_STORAGE_NAME + `-${ownerId}`;

  const userInboxLocalStorage: InboxType[] = getEmailFromLocalStorage(ownerId);

  // Items exist in local storage.
  if (userInboxLocalStorage.length !== 0) {

    const categoryArray: Email[] = [...userInboxLocalStorage[0][CATEGORY], email];

    userInboxLocalStorage[0][CATEGORY] = categoryArray;
  } else {

    const inboxLocal: InboxType[] = [
      {
        belongsTo: ownerId,
        inbox: [],
        draft: [],
        sent: [],
        deleted: [],
        results: [],
      }
    ];

    inboxLocal[0][CATEGORY].push(email);

    userInboxLocalStorage.push(inboxLocal[0]);
  }

  localStorage.setItem(UNIQUE_KEY, JSON.stringify(userInboxLocalStorage));
}

const getEmailFromLocalStorage = (id: number): InboxType[] => {
  const UNIQUE_KEY = UNIQUE_STORAGE_NAME + `-${id}`;

  const emailLocalStorage: InboxType[] = JSON.parse(localStorage.getItem(UNIQUE_KEY) || "[]") ;

  return emailLocalStorage;
}

const deleteLocalStorageForLoggedOutUser = (id: number): void => {
  const UNIQUE_KEY = UNIQUE_STORAGE_NAME + `-${id}`;

  localStorage.removeItem(UNIQUE_KEY);
}

const deleteEmailFromALocalStorageCategory = (loggedUserID: number, emailID: string, category: keyof InboxTypeKeys): void => {
  // If the email is from inbox, draft, or sent will be moved to delete category.
  // If email is from delete category it will be permanent removed
  const CATEGORY = category;

  const emailsLocalStorage: InboxType[] = getEmailFromLocalStorage(loggedUserID);

  const removedEmail: Email = emailsLocalStorage[0][CATEGORY].filter(email => email.id === emailID)[0];

  // Updated the current local storage
  emailsLocalStorage[0][CATEGORY] = emailsLocalStorage[0][CATEGORY].filter(email => email.id !== emailID);

  if (CATEGORY !== 'deleted' && removedEmail !== undefined) {
    // Moves to 'delete' category
    emailsLocalStorage[0]['deleted'].push(removedEmail);
  }

  deleteLocalStorageForLoggedOutUser(loggedUserID);

  const { inbox, draft, sent, deleted } = emailsLocalStorage[0];

  inbox.forEach(i => {
    insertEmailInLocalStorage(i, loggedUserID, 'inbox');
  });

  draft.forEach(i => {
    insertEmailInLocalStorage(i, loggedUserID, 'draft');
  });

  sent.forEach(i => {
    insertEmailInLocalStorage(i, loggedUserID, 'sent');
  });

  deleted.forEach(i => {
    insertEmailInLocalStorage(i, loggedUserID, 'deleted');
  });
}

const markInboxEmail = (emailID: string, userID: number, inboxKey: keyof InboxTypeKeys, isRead: boolean) => {

  const UNIQUE_KEY = UNIQUE_STORAGE_NAME + `-${userID}`;

  let inboxData = getEmailFromLocalStorage(userID);

  // inboxData[0]['inbox'] = inboxData[0].inbox.map(email => email.id === emailID ? {...email, emailRead: true} : email);
  inboxData[0][inboxKey] = inboxData[0][inboxKey].map(email => email.id === emailID ? {...email, emailRead: isRead} : email);

  deleteLocalStorageForLoggedOutUser(userID);

  localStorage.setItem(UNIQUE_KEY, JSON.stringify(inboxData));
}


export {
  fetchUser,
  fetchInbox,
  insertEmailInLocalStorage,
  getEmailFromLocalStorage,
  syncApplicationLocalStorage,
  deleteLocalStorageForLoggedOutUser,
  deleteEmailFromALocalStorageCategory,
  markInboxEmail
}
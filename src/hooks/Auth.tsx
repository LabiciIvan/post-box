import { User } from '../types';

const localStorageName = 'post-box-storage';

const isUserLoggedIn = (): User|false => {
  const userData: string|null = localStorage.getItem(localStorageName);

  if (!userData) return false;

  const userAsObject: User = JSON.parse(atob(userData));

  return userAsObject;
}

export {
  isUserLoggedIn
};

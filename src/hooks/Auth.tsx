import { ProfileInterface, User } from '../types';

const localStorageName = 'post-box-storage';
const localStorageProfileName = 'post-box-storage-profile';

const isUserLoggedIn = (): User|false => {
  const userData: string|null = localStorage.getItem(localStorageName);

  if (!userData) return false;

  // const userAsObject: User = JSON.parse(atob(userData));
  const userAsObject: User = JSON.parse(userData);

  return userAsObject;
}

const isLoggedIn = (user: User): boolean => {

  const userData: string|null = localStorage.getItem(localStorageName);

  if (!userData) return false;

  // const userAsObject: User = JSON.parse(atob(userData));
  const userAsObject: User = JSON.parse(userData);

  const {name, password} = userAsObject;

  return (name === user.name && password === user.password);
}

const loginUser = (credentials: User, profile: ProfileInterface): boolean => {

  const user: string = JSON.stringify(credentials);

  const profileUser: string = JSON.stringify(profile);

  localStorage.setItem(localStorageName, user);

  localStorage.setItem(localStorageProfileName, profileUser);

  return true;
}

const logoutUser = (user: User): boolean => {

  const anyLoggedUser: string|null = localStorage.getItem(localStorageName);

  if (!anyLoggedUser) return false;

  // const loggedUser = JSON.parse(atob(anyLoggedUser));
  const loggedUser = JSON.parse(anyLoggedUser);

  const {email, password} = loggedUser;

  if (email !== user.email && password !== user.password) return false;

  localStorage.removeItem(localStorageName);

  return true;
}


export {
  isLoggedIn,
  loginUser,
  logoutUser,
  isUserLoggedIn
};

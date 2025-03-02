import { User } from '../types';

const localStorageName = 'post-box-storage';

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

const loginUser = (credentials: User): boolean => {

  // const user: string = btoa(JSON.stringify(credentials));
  const user: string = JSON.stringify(credentials);

  localStorage.setItem(localStorageName, user);

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

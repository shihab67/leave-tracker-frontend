import React, { useState, useCallback } from 'react';
import axios from 'axios';

const AuthContext = React.createContext({
  currentUser: {},
  isLoggedIn: false,
  login: () => {},
  logout: () => {}
});

const retrieveCurrentUser = () => {
  const storedCurrentUser = localStorage.getItem('currentUser');
  if (storedCurrentUser === 'undefined' || !storedCurrentUser) {
    return '';
  }
  return JSON.parse(storedCurrentUser);
};

export const AuthContextProvider = (props) => {
  const currentUserData = retrieveCurrentUser();
  const [currentUser, setCurrentUser] = useState(currentUserData);

  const userIsLoggedIn = !!currentUser;

  const logoutHandler = useCallback(() => {
    setCurrentUser('');
    localStorage.removeItem('currentUser');
  }, []);

  const loginHandler = (currentUserData) => {
    const tokenData = Object.assign(
      {},
      { email: currentUserData.email, name: currentUserData.name, last_name: currentUserData.last_name, token: currentUserData.token }
    );
    setCurrentUser(tokenData);
    localStorage.setItem('currentUser', JSON.stringify(tokenData));
  };

  const setHeader = () => {
    // SET AUTHORIZATION REQUEST
    if (currentUser) {
      axios.defaults.headers.common.Authorization = `Bearer ${currentUser.token}`;
    }
  };

  const contextValue = {
    currentUser: currentUser,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    header: setHeader,
    logout: logoutHandler
  };

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;

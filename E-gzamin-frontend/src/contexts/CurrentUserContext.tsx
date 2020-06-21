import React, { useContext, createContext } from 'react';
import { useQuery } from 'react-query';

import getCurrentUser from '../actions/getCurrentUser';
import Loader from '../components/Loader';

const CurrentUserContext = createContext({});

const useCurrentUser = () => useContext(CurrentUserContext);

const CurrentUserContextProvider = ({ children }) => {
  const { status, data, error, isFetching } = useQuery(
    'getCurrentUser',
    getCurrentUser,
    {
      manual: true,
    },
  );

  if (isFetching) {
    return <Loader />;
  }

  return (
    <CurrentUserContext.Provider value={data}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export { CurrentUserContext, useCurrentUser, CurrentUserContextProvider };

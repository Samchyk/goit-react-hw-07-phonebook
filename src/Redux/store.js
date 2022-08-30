import { configureStore } from '@reduxjs/toolkit';
import {
   persistStore,
   persistReducer,
   FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER,
} from 'redux-persist';
import localStorage from 'redux-persist/lib/storage';
import makeRootReducer from './contacts/contact-reduser';

const persistConfig = {
   key: 'contacts',
   storage: localStorage,
};

const persistedReducer = persistReducer(persistConfig, makeRootReducer);

export const store = configureStore({
   reducer: {
      contact: persistedReducer,
   },
   devTools: process.env.NODE_ENV === 'development',
   middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
         },
      }),
});

export const persistor = persistStore(store);

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loaderSlice from "./Redux/Actions/loaderSlice";
import AuthSlice from "./Redux/Auth/AuthSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, AuthSlice)

const combinedReducer = combineReducers({
  // counter: counterReducer,
  auth: persistedReducer,
    loader: loaderSlice,
});
const rootReducer = (state, action) => {
  if (action.type === 'counter/logout') {
    state = undefined;
  }
  return combinedReducer(state, action);
};


export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk]
});


export const persistor = persistStore(store)

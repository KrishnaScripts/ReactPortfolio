import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import passengerSlice from "./slicers/passengerSlice";
import crudSlicer from "./slicers/crudSlice"


const reducers = combineReducers({
    users: crudSlicer,
    passenger: passengerSlice
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk],
});
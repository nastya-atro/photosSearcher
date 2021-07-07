import { combineReducers, configureStore } from "@reduxjs/toolkit";
import reducerToolkit from "./reducer";

let rootReducer = combineReducers({
    search: reducerToolkit
});

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

let store = configureStore({
    reducer: rootReducer
})

export default store;
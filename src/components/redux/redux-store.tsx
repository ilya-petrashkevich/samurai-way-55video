import {combineReducers, createStore} from "redux";
import {profileReducer} from "./profile-reducer";
import {dialogsReducer} from "./dialogs-reduser";
import navbarReducer from "./navbar-reducer";
import {usersReducer} from "./users-reducer";

let rootReducer = combineReducers({
    //это как бы сокращённая запись, а если раскомментить закомменченное ниже через двоеточие, то это как бы полная будет!!!
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    sidebar: navbarReducer
})

export type AppStateType = ReturnType<typeof rootReducer>;

let store = createStore(rootReducer);

export default store;
//@ts-ignore
window.store=store
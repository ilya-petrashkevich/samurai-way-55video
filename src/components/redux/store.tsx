import {profileReducer, addPostAC, updateNewPostTextAC} from "./profile-reducer";
import {dialogsReducer, sendMessageAC, updateNewMessageBodyAC} from "./dialogs-reduser";
import navbarReducer from "./navbar-reducer";
import {
    followAC,
    setCurrentPageAC,
    setUsersAC,
    setUsersTotalCountAC,
    unfollowAC,
    usersReducer,
    UserType
} from "./users-reducer";



export type DialogsType = {
    id: number
    name: string
}
export type MessagesType = {
    id: number
    message: string
}

export type newMessageBodyType = string
let newMessageBody: newMessageBodyType = "";

export type PostsType = {
    id: number
    message: string
    likesCount: number
}

export type newPostTextType = string //это под снос
let newPostText: newPostTextType = 'it-kamasutra.com'; //это под снос

export type DialogsPageType = {
    dialogs: DialogsType[]
    messages: MessagesType[]
    newMessageBody: string
}

export type ProfilePageType = {
    posts: PostsType[]
    newPostText: newPostTextType
}

export type UsersPageType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
}

export type StateType = {
    dialogsPage: DialogsPageType
    profilePage: ProfilePageType

    usersPage: UsersPageType
    sidebar: {}
}

    let pageSize = 0;
    let totalUsersCount = 0;
    let currentPage = 0;

let dialogs: DialogsType[] = [
    {id: 1, name: "Dimich"},
    {id: 2, name: "Andrew"},
    {id: 3, name: "Sveta"},
    {id: 4, name: "Sasha"},
    {id: 5, name: "Viktor"},
    {id: 6, name: "Valera"},
];

let messages: MessagesType[] = [
    {id: 1, message: "Hi"},
    {id: 2, message: "How are you"},
    {id: 3, message: "Yo"},
    {id: 4, message: "Bla"},
    {id: 5, message: "Blabla"},
    {id: 6, message: "Blablabla"},
];

let posts: PostsType[] = [
    {id: 1, message: "Hi, how are you?", likesCount: 12},
    {id: 2, message: "It`s my first post", likesCount: 5},
];

let users: UserType[] = [
    {
        id: 1,
        photoURL: 'https://comp-pro.ru/wp-content/uploads/b/7/0/b702c0cdba04fbaca0a1226ecf052fac.jpeg',
        followed: false,//fullName: 'Dmitry'
        name: 'Dmitry',
        status: 'boss',
        location: {city: 'Minsk', country: 'Belarus'}
    },
    {
        id: 2,
        photoURL: 'https://comp-pro.ru/wp-content/uploads/b/7/0/b702c0cdba04fbaca0a1226ecf052fac.jpeg',
        followed: true, //fullName: 'Sasha'
        name: 'Sasha',
        status: 'boss',
        location: {city: 'Moscow', country: 'Russia'}
    },
    {
        id: 3,
        photoURL: 'https://comp-pro.ru/wp-content/uploads/b/7/0/b702c0cdba04fbaca0a1226ecf052fac.jpeg',
        followed: false, //fullName: 'Andrew'
        name: 'Andrew',
        status: 'boss',
        location: {city: 'Kiev', country: 'Ukraine'}
    }
];


// export let state: StateType = {
//     dialogsPage: {
//         dialogs,
//         messages
//     },
//     profilePage: {
//         posts,
//         newPostText //эта строчка под снос
//     }
// }

// export let addPost = (postMessage?: string) => {
//     let newPost: PostsType = {
//         id: state.profilePage.posts.length + 1, // или просто номер вставлять вручную
//         message: state.profilePage.newPostText,
//         likesCount: 0
//     }
//     state.profilePage.posts.push(newPost);
//     state.profilePage.newPostText = '';
//     onChange();
// }

// export const updateNewPostText = (newText: string) => {
//     state.profilePage.newPostText = newText;
//     onChange();
// }

export type StoreType = {
    _state: StateType
    _onChange: () => void
    subscribe: (callback: () => void) => void
    getState: () => StateType
    dispatch: (action: ActionsTypes) => void // в значение ключа action можно напрямую вставить AddPostActionType | UpdateNewPostTextActionType
}

export type ActionsTypes =
    ReturnType<typeof addPostAC>
    | ReturnType<typeof updateNewPostTextAC>
    | ReturnType<typeof updateNewMessageBodyAC>
    | ReturnType<typeof sendMessageAC>
    | ReturnType<typeof followAC>
    | ReturnType<typeof unfollowAC>
    | ReturnType<typeof setUsersAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setUsersTotalCountAC>;


export const store: StoreType = {
    _state: {
        dialogsPage: {
            dialogs,
            messages,
            newMessageBody
        },
        profilePage: {
            posts,
            newPostText //эта строчка под снос
        },
        usersPage: {
          users,
          pageSize,
          totalUsersCount,
          currentPage
        },
        sidebar: {}
    },
    _onChange() {
        console.log('State was changed')
    },
    subscribe(callback/*: () => void*/) {
        this._onChange = callback;
    },
    getState() {
        return this._state;
    },
    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.usersPage = usersReducer(this._state.usersPage, action)
        this._state.sidebar = navbarReducer(this._state.sidebar, action)
        // this._state.usersPage = usersReducer(this._state.usersPage, action)

        this._onChange();
    }
}

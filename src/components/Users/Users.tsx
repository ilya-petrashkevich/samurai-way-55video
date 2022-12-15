import React from 'react';
import styles from './users.module.css';
import {UsersPropsType} from "./UsersContainer";
import /* * as*/ axios from "axios";
import userPhoto from '../../assets/images/user.png';

export class Users extends React.Component<UsersPropsType>/*<any, any>*/ {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            })
    }

    // getUsers = () => {
    //     if (this.props.usersPage.users.length === 0) {
    //         axios.get('https://social-network.samuraijs.com/api/1.0/users')
    //             .then(response => {
    //                 this.props.setUsers(response.data.items)
    //             })
    //     }
    // }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }

    render() {
        let pagesCount = Math.ceil( this.props.totalUsersCount/ this.props.pageSize );
        let pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }

        return (
            <div>

                <div>
                    {pages.map( p => {
                       return <span onClick={() => this.onPageChanged(p) } className = {styles.pageNum +` ${this.props.currentPage === p && styles.selectedPage}`}>{p}</span>
                    } )}
                </div>

                {/*<button onClick={this.getUsers}>Get Users</button>*/}
                {
                    this.props.usersPage.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <img src={!u.photoURL ? userPhoto : u.photoURL/*u.photoURL*/} className={styles.userPhoto}
                                 alt={'user-avatar'}/>
                        </div>
                        <div>
                            {u.followed
                                ?
                                <button onClick={() => {
                                    this.props.unfollow(u.id)
                                }}>Unfollow</button>
                                :
                                <button onClick={() => {
                                    this.props.follow(u.id)
                                }}>Follow</button>
                            }
                        </div>
                    </span>
                        <span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{"u.location.country"}</div>
                            <div>{"u.location.city"}</div>
                        </span>
                    </span>
                    </div>)
                }
            </div>
        );
    }
}

// export default Users;
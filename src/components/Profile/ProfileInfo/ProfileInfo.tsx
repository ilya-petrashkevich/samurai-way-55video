import React from 'react';
import s from "./ProfileInfo.module.css";

const ProfileInfo = () => {
    return (
        <div>
            <div>
                <img
                    src="https://www.worthingcourt.com/images/Blog/5_of_the_best_beaches/Dover_Beach_WCH_Blog_3.jpg"
                    alt="pic"/>
            </div>
            <div className={s.descriptionBlock}>
                ava + description
            </div>

        </div>
    );
};

export default ProfileInfo;
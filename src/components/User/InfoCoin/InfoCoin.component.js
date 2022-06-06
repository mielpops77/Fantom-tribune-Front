import React, { useState, useEffect } from 'react';
import NavigationUserComponent from '../../Navigation/NavigationUser/NavigationUser.component';
import style from "./InfoCoin.module.scss"
const InfoCoin = () => {
    const [posts, setPosts] = useState([]);


    let url = window.location.href;
    const id = url.substring(31, url.length);

    useEffect(() => {
        fetch('http://localhost:3000/launchDate/')
            .then((res) => res.json())
            .then((res) => {
                setPosts(res);
            });
    }, []);

    let postsArray = JSON.parse(JSON.stringify(posts));
    let coin = []

    for (let i = 0; i < postsArray.length; i++) {
        if (postsArray[i]._id === id) {
            coin = postsArray[i];
        }
    }

    return (

        <div>
            <NavigationUserComponent />
            <div className={style.divCorpCoin}>
                <p className={style.test}>ssss{coin.name}</p>
            </div>
        </div>
    )
}

export default InfoCoin;
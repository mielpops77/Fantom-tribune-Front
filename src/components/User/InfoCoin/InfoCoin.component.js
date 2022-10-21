import NavigationUserComponent from '../../Navigation/NavigationUser/NavigationUser.component';
import AuthService from "../../../services/auth/auth.service";
import React, { useState, useEffect } from 'react';
import style from "./InfoCoin.module.scss"
const InfoCoin = () => {
    const [posts, setPosts] = useState([]);


    const url = AuthService.getUrl()
    let path = window.location.href;
    const id = path.substring(50, path.length);

    // Version Local 
    /* const id = path.substring(31, path.length); */

    useEffect(() => {
        fetch(url + 'ecosystem/')
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
    let src = "https://kek.tools/t/";
    src = src + coin.contractAddress + "/chart";


    return (

        <div className={style.container}>
            <NavigationUserComponent />
            <div className={style.divCorpCoin}>
                <p className={style.test}>{coin.name}</p>
                <iframe title="Graphical Board" loading="lazy" src={src} width="50%" height="600px" frameborder="0" scrolling="no" ></iframe>
            </div>
        </div>
    )
}

export default InfoCoin;
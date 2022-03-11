import React, { useState, useEffect } from 'react';
import NavigationUserComponent from '../../Navigation/NavigationUser/NavigationUser.component';

const InfoCoin = () => {
    const [posts, setPosts] = useState([]);


    let url = window.location.href;
    const id = url.substring(31, url.length);
    console.log(id);


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
        if (postsArray[i].id = id) {
            coin = postsArray[i];
        }
    }

    console.log('coin', coin);
    return (

        <div >
            <NavigationUserComponent />
            <br /><br /><br />
            <h1>ddddddddddd</h1>
        </div>
    )
}

export default InfoCoin;
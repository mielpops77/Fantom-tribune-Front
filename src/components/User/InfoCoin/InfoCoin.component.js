import React, { useState, useEffect } from 'react';

const InfoCoin = () => {
    const [posts, setPosts] = useState([]);


    let url = window.location.href;
    const id = url.substring(31, url.length );
    console.log(id);


    useEffect(() => {
        fetch('http://localhost:3000/launchDate/')
            .then((res) => res.json())
            .then((res) => {
                setPosts(res);
            });
    }, []);
    return (

        <div >
            <h1>ddddddddddd</h1>
        </div>
    )
}

export default InfoCoin;
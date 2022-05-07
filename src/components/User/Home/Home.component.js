
import React from 'react';
import style from "./Home.module.scss";


const Home = () => {

    const elements = ['1', '2', '3', '4', '1', '2', '3', '4', '1', '2', '3', '4', '1', '2', '3', '4'];

    return (
        <div >
            <p className={style.topTrendingTitle}>Top Trending <span className={style.spanTokenTitle}>Tokens</span> </p>
            <br /><br />

            <div className={style.all}>
                {elements.map(() => {
                    return <div className={style.rectangle}>

                        <h1>BLAZE</h1>


                    </div>
                })}
            </div>
        </div >


    );
}



export default Home;




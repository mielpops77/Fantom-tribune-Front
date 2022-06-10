import NavigationUserComponent from './components/Navigation/NavigationUser/NavigationUser.component';
import HomeComponent from './components/User/Home/Home.component'
import style from './components/User/Home/Home.module.scss';

const Home = () => {
    return (
        <div className ={style.mainDiv}>
            <NavigationUserComponent/>
            <div className={style.firstPage}>
                <h1 className={style.titleh1}>Discover ...</h1>
                <h2 className={style.titleh2}> ... your next Moon!</h2>
                <div className={style.filter}>
                    <div>
                        <p>Presale</p>>
                        <button></button>
                    </div>
                </div>
            </div>
        <HomeComponent/>
        </div>
    )
}

export default Home;
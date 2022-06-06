import NavigationUserComponent from '../../components/Navigation/NavigationUser/NavigationUser.component';
import HomeComponent from '../../components/User/Home/Home.component'
import style from './Home.module.scss';

const Home = () => {
    return (
        <div className ={style.mainDiv}>
            <NavigationUserComponent/>

            <h1>Discover ...</h1>
            <h2> ... your next Moon!</h2>
            <HomeComponent/>    
        </div>
        
    )
}

export default Home;
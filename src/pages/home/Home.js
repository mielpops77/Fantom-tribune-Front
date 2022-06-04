import NavigationUserComponent from '../../components/Navigation/NavigationUser/NavigationUser.component';
import style from './Home.module.scss';



const Home = () => {
    return (
        <div className ={style.mainDiv}>
            <NavigationUserComponent/>
            <h1>Discover ...</h1>
            <h2> ... your next Moon!</h2>
            
        </div>
    )
}

export default Home;
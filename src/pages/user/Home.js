import NavigationUserComponent from '../../components/navigation/NavigationUser.component';
import Logo from '../../components/Logo';



const Home = () => {
    return (
        <div className ="home">
            <NavigationUserComponent/>
            <Logo/>
            <h1>
                accueil
            </h1>
            
        </div>
    )
}

export default Home;
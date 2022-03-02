import NavigationAdmin from '../components/NavigationAdmin';
import Logo from '../components/Logo';
import AdministrationOnline from '../components/AdministrationOnline'


const Administration = () => {
    return (
        <div className ="admin">
            <NavigationAdmin/>
            <Logo/>
            <br /><br /><br />
            <AdministrationOnline/>
            <h1>
                Admin
            </h1>
            
        </div>
    )
}

export default Administration;
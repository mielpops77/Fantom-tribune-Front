import NavigationAdminComponent from '../../components/navigation/NavigationAdmin.component';
import AdministrationComponent from '../../components/admin/Administration.component'
import Logo from '../../components/Logo';


const Administration = () => {
    return (
        <div className ="admin">
            <NavigationAdminComponent/>
            <Logo/>
            <br /><br /><br />
            <AdministrationComponent/>
            <h1>
                Admin
            </h1>
            
        </div>
    )
}

export default Administration;
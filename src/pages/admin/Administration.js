import NavigationAdminComponent from '../../components/navigation/NavigationAdmin.component';
import AdministrationComponent from '../../components/admin/Administration.component'

const Administration = () => {
    return (
        <div className ="admin">
            <NavigationAdminComponent/>
            <br /><br /><br />
            <AdministrationComponent/>
            <h1>
                Admin
            </h1>
            
        </div>
    )
}

export default Administration;
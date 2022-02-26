import Navigation from '../components/Navigation';
import Logo from '../components/Logo';
import TableauAdmin from '../components/TableauAdmin'


const Admin = () => {
    return (
        <div className ="admin">
            <Navigation/>
            <Logo/>
            <br /><br /><br />
            <TableauAdmin/>
            <h1>
                Admin
            </h1>
            
        </div>
    )
}

export default Admin;
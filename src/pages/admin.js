import Navigation from '../components/Navigation';
import TableauAdmin from '../components/TableauAdmin'


const Admin = () => {
    return (
        <div className ="admin">
            <Navigation/>
            <br /><br /><br />
            <TableauAdmin/>
            <h1>
                Admin
            </h1>
            
        </div>
    )
}

export default Admin;
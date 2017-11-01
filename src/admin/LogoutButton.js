import { userLogout } from 'admin-on-rest';
import MenuItem from 'material-ui/MenuItem';
import StorageIcon from 'material-ui/svg-icons/device/storage';

const LogoutButton = (closeAdmin) =>{
    return ({ userLogout }) => (
        <MenuItem
            to="/"
            className="logout"
            leftIcon={<StorageIcon />}
            primaryText="Repositories"
            onClick={closeAdmin}
        />
    )
};

export default LogoutButton;
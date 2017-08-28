import { userLogout } from 'admin-on-rest';
import MenuItem from 'material-ui/MenuItem';
import ExitIcon from 'material-ui/svg-icons/action/power-settings-new';

const LogoutButton = (closeAdmin) =>{
    return ({ userLogout }) => (
        <MenuItem
            to="/"
            className="logout"
            leftIcon={<ExitIcon />}
            primaryText="Repositories"
            onClick={closeAdmin}
        />
    )
};

export default LogoutButton;
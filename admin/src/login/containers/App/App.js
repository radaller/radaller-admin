import React, { Component } from 'react';
import { observer } from 'mobx-react';
import 'react-flexbox-grid/lib/index.css'
import './App.css';

import {
    cyan500, cyan700,
    pinkA200,
    grey100, grey300, grey400, grey500,
    white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import Login from '../Login/Login';
import AddRepo from '../AddRepo/AddRepo';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: cyan500,
        primary2Color: cyan700,
        primary3Color: grey400,
        accent1Color: pinkA200,
        accent2Color: grey100,
        accent3Color: grey500,
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        pickerHeaderColor: cyan500,
        shadowColor: fullBlack,
    },
});


@observer
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogin: true
        };

        this.onLoggedIn = this.onLoggedIn.bind(this);
    }

    onLoggedIn() {
        this.setState({
            showLogin: false,
        })
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className="loginContainer">
                    <div className="loginWrapper">
                        {
                            this.state.showLogin && (
                                <Login
                                    onLogedIn={ this.onLoggedIn }
                                />
                            )
                        }
                        {
                            !this.state.showLogin && (
                                <AddRepo />
                            )
                        }
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;

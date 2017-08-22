import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './App.css';

import createMuiTheme from 'material-ui/styles/theme';
import { MuiThemeProvider } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import blue from 'material-ui/colors/blue';
import red from 'material-ui/colors/red';
import Login from '../Login/Login';
import AddRepo from '../AddRepo/AddRepo';

const theme = createMuiTheme({
    palette: createPalette({
        primary: blue,
        error: red,
    }),
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
            <MuiThemeProvider theme={theme}>
                <div className="container">
                    <div className="wrapper">
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

import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import Paper from 'material-ui/Paper';
import { Grid, Row } from 'react-flexbox-grid';
import Snackbar from 'material-ui/Snackbar';

import {
    cyan500, cyan700,
    pinkA200,
    grey100, grey300, grey400, grey500,
    white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';

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

const loginContainer = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute'
};
const loginWrapper = {
    maxWidth: '700px',
    flexDirection: 'column',
    width: '100%'
};

@inject("store") @observer
class OneColumnLayout extends Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={loginContainer}>
                    <div style={loginWrapper}>
                        <Paper zDepth={2}>
                            <Grid fluid>
                                <Row style={{height: "400px"}}>
                                    { this.props.children }
                                </Row>
                            </Grid>
                        </Paper>
                    </div>
                </div>
                <Snackbar
                    className="error-snack"
                    open={!!this.props.store.snackbarMessage}
                    message={this.props.store.snackbarMessage}
                    autoHideDuration={4000}
                    onRequestClose={ this.props.store.clearSnackbarMessage }
                />
            </MuiThemeProvider>
        );
    }
}

export default OneColumnLayout;

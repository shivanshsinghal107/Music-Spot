import React, { Component } from "react";
import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";
import Room from "./Room";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomCode: null,
        };
        this.clearRoomCode = this.clearRoomCode.bind(this);
    }

    async componentDidMount() {
        fetch('/api/user-in-room')
        .then((response) => response.json())
        .then((data) => {
            this.setState({
                roomCode: data.code
            });
        });
    }

    renderHomePage() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12} align="center">
                    <Typography variant="h3" component="h3">
                        Nacho BC
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <ButtonGroup disableElevation variant="contained" color="primary">
                        <Button color="primary" to="/join" component={Link}>
                            Join Room
                        </Button>
                        <Button color="secondary" to="/create" component={Link}>
                            Create Room
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        );
    }

    clearRoomCode() {
        this.setState({
            roomCode: null,
        });
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' render={() => {
                        return this.state.roomCode ? (
                        <Redirect to={`/room/${this.state.roomCode}`} />
                        ) : (
                            this.renderHomePage()
                        );
                        }}
                    />
                    <Route path='/join' component={JoinRoom} />
                    <Route path='/create' component={CreateRoom} />
                    <Route
                        path='/room/:roomCode'
                        render={(props) => {
                            return <Room {...props} leaveRoomCallback={this.clearRoomCode} />
                        }}
                    />
                </Switch>
            </Router>
        );
    }
}
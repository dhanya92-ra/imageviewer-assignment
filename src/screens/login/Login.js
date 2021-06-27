//importing the necessary import statements for card, formcontrol, inputlabel, input, button, header, login.css and formhelpertext
import React, { Component } from 'react';
import Header from "../../common/header/Header";
import './Login.css';
import Card from "@material-ui/core/Card";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Redirect } from 'react-router-dom';

// Creating Login class component to render the login page as per the design
class Login extends Component {

    constructor() {
        super();
        this.state = {
            usernameRequired: "dispNone",
            passwordRequired: "dispNone",
            incorrectUsernamePasswordMessage: "dispNone",
            username: "",
            password: "",
            isLoggedIn: false,
        };
    }

    /**
     * Function that handles any changes in the username field and updates state accordingly
     */
    inputUsernameChangeHandler = (e) => {
        this.setState({ username: e.target.value });
    }

    /**
     * Function that handles any changes in the password field and updates state accordingly
     */
    inputPasswordChangeHandler = (e) => {
        this.setState({ password: e.target.value });
    }

    /**
     * Function that handles what happens when we click the login button
     */
    loginClickHandler = () => {
        //Setting credentials in the login handler
        let username = "InstaGrad";
        let password = "Sass@123#";

        let accessToken = "8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784";
        if (this.state.username === "" || this.state.password === "") {
            // The usernameRequired and passwordRequired fields are used when we want to store the class to be assigned
            this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
            this.state.password === "" ? this.setState({ passwordRequired: "dispBlock" }) : this.setState({ passwordRequired: "dispNone" });
            this.setState({ incorrectUsernamePasswordMessage: "dispNone" });
        } else if (this.state.username === username && this.state.password === password) {
            // Setting token in session storage
            sessionStorage.setItem("access-token", accessToken);
            // Setting state so as to check and route to home page if login is successful.
            this.setState({
                isLoggedIn: true,
            });
        } else {
            // In case the username and password are incorrect
            this.setState({ incorrectUsernamePasswordMessage: "dispBlock" });
        }

    }

    render() {
        return (
            <div>
                {this.state.isLoggedIn === true ?
                <Redirect to= "/home"/>
                :
                    <div>
                        <Header></Header> //opening and closing header component
                        <Card className="login-card">
                            <p className="login-header">LOGIN</p> //creating login as paragraph tag
                            <FormControl required>
                                <InputLabel htmlFor="username">Username</InputLabel> // creating inputlabel as username
                                <Input id="username" type="text" username={this.state.username} onChange={this.inputUsernameChangeHandler} value = {this.state.username}/>
                                <FormHelperText className={this.state.usernameRequired}><span className="red">required</span></FormHelperText>
                            </FormControl>
                            <br />
                            <br />
                            <FormControl required>
                                <InputLabel htmlFor="password">Password</InputLabel> //creating inputlabel as password
                                <Input id="password" type="password" password={this.state.password} onChange={this.inputPasswordChangeHandler} value = {this.state.password}/>
                                <FormHelperText className={this.state.passwordRequired}><span className="red">required</span></FormHelperText>
                            </FormControl>
                            <br />
                            <br />
                            // if the username or password is incorrect display it in red color text message to user
                            <FormHelperText className={this.state.incorrectUsernamePasswordMessage}><span className="red" style={{ fontSize: "14px" }}>Incorrect username and/or password</span></FormHelperText>
                            <br />
                            //creating a login button
                            <Button variant="contained" color="primary" onClick={this.loginClickHandler} className="login-btn">LOGIN</Button>
                        </Card>
                    </div>
                }
            </div>
        );
    }
}

//exporting the default statement for login
export default Login;
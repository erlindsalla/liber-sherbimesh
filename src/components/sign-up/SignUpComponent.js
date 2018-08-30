import React, { Component } from 'react';
import './sign-up-css.css';
import axios from 'axios';
import {BrowserRouter, Route, Link, Redirect } from 'react-router-dom';
axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded"


class SignUpComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            firstName:"",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            regiser: false
        };
    }


      handleClick(event){
        var apiBaseUrl = "http://localhost:8080/api/";
        console.log("values",this.state.first_name,this.state.last_name,this.state.email,this.state.password);
        var self = this;
        this.setState({regiser:true});
        if(this.state.password == this.state.confirmPassword){
            var passwordHash = require('password-hash');
            var pas=this.state.password;
            var CryptoJS = require("crypto-js");
           var hashedPassword= CryptoJS.MD5(pas)
            this.state.password =(hashedPassword+"")
            console.log("test STR="+ this.state.password);
            var payload={
                "firstName": this.state.firstName,
                "lastName":this.state.lastName,
                "email":this.state.email,
                "password":  this.state.password
            }
            axios.post(apiBaseUrl+'user', payload)
            .then(function (response) {
                console.log(response);
                if(response.data.code == 200){
                console.log("registration successfull");

                <Redirect to='/login' />
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }else{
            alert("Password does not match");
        }
    }
    render(){
        return (
            <div className="register-container">
            {this.state.regiser && <Redirect to="/login" />}
                <form className="register-box">
                    <div>
                        <h1>Please signup to continue </h1>
                    </div>
                    <div>
                        <label for="text"><b>Firstname</b></label>
                    </div>
                    <div>
                        <input type="text" placeholder='your name goes here' required
                         onChange = {(event,newValue) => this.setState({firstName:event.target.value})}
                         />
                    </div>
                    <div>
                        <label for="text"><b>Lastname</b></label>
                    </div>
                    <div>
                        <input type="text" placeholder='your lastname goes here'
                         onChange = {(event,newValue) => this.setState({lastName:event.target.value})} required
                          />
                    </div>
                    <div>
                        <label for="email"><b>Email</b></label>
                    </div>
                    <div>
                        <input type="text" placeholder='your email goes here' required
                        onChange = {(event,newValue) => this.setState({email:event.target.value})}
                         />
                    </div>
                    <div>
                        <label for="text"><b>Password</b></label>
                    </div>
                    <div>
                        <input type="password" placeholder='your password goes here' required
                        onChange = {(event,newValue) => this.setState({password:event.target.value})}
                        />
                    </div>
                    <div>
                        <label for="text"><b>Confirm password</b></label>
                    </div>
                    <div>
                        <input type="password" placeholder='confirm your password here' required
                       onChange= {(event,newValue) => this.setState({confirmPassword:event.target.value})}
                        />
                    </div>
                    <div class="clearfix">
                    <div className="row">
                        <div className="col-md-10">
                        <button type="submit" className="signupbtn green-btn" onClick={(event) => this.handleClick(event)} >Sign Up</button>
                        </div>
                        <div className="col-md-2 login-button-container">
                        <Link to="/" className="loginLink" >Login</Link>
                        </div>
                    </div>
                </div>
                </form>
            </div>
        )
    }
}

export default SignUpComponent;

import React from 'react';
import axios from 'axios';

export default class Login extends React.Component{
    constructor(){
        super()
        this.state = {
            username : "",
            password : ""
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handleLogin = (e) => {
        e.preventDefault()
        let data = {
            username : this.state.username,
            password : this.state.password
        }
        let url = "http://localhost:8000/admin/auth/"
        axios.post(url, data)
        .then(res => {
            if (res.data.logged){
                let name = res.data.data.name
                let admin = res.data.data
                let token = res.data.token
                localStorage.setItem("name", name)
                localStorage.setItem("admin", JSON.stringify(admin))
                localStorage.setItem("token", token)
                window.location = "/"
            }
            else{
                window.alert(res.data.message)
            }
        })
    }
    render(){
        return(
            <div className="container"> 
                <main className="form-signin">
                    <form onSubmit={(e) => this.handleLogin(e)}>
                        <h1>L O G I N</h1>
                        <div className="form-floating">
                            <input type="text" className="form-control" id="userName" name="username" placeholder="Insert Username" onChange={this.handleChange} value={this.state.username} required/>
                            <label for="username">Username</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" class="form-control" id="password" 
                            name="password" placeholder="Password" onChange={this.handleChange} value={this.state.password} required/>
                            <label for="password">Password</label>
                        </div>  
                        <button className="w-100 btn btn-lg btn-dark" type="submit">Sign in</button>
                    </form>
                </main>
            </div>
        );
    }
}
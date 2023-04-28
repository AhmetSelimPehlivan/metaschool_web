import  React, {useState} from "react";
import { useHistory } from 'react-router-dom';
import { passwordValidator } from '../constants';
import VrImage from './../assets/VRImage.jpg'
import Footer from "../components/Footer/Footer.js";
import { useAuth } from "contexts/AuthContext";

const UserLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [save_msg, setsave_msg] = useState("");
    const history = useHistory();
    const {setIsAuthenticated, isAuthenticated} = useAuth();
    const signup = async () => {
        try {
            
            if(!passwordValidator.test(password)){
                setsave_msg("Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase!")
            }
            else{
                fetch('https://metaschool-web.onrender.com/signup', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      user_name: username.toString(),
                      password: password.toString()
                    })
                  }).then(response => response.json())
                .then(data => {
                    localStorage.setItem("token", data.accessToken);
                    setIsAuthenticated(true)
                    history.push("/admin/dashboard");
                })
                .catch(error => {
                    setsave_msg(error.response.data.message)
                });
            }
        } catch (error) {
            setsave_msg(error.response.data.message)
        }
    }

    const authorization = async () => {
        await fetch('https://metaschool-web.onrender.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_name: username.toString(),
                password: password.toString()
            })
            }).then(response => response.json())
            .then(data => {
                if(data.accessToken !== undefined){
                    if(localStorage.getItem("token") === null || localStorage.getItem("token") === undefined)
                        localStorage.setItem("token", data.accessToken);
                    setIsAuthenticated(true)
                }
                else
                    setsave_msg("!Invalid Email or Password"); 
            })
        .catch(error => {
            setsave_msg(error.response.data.message);
        });
    }

    return(
        <>
            <div class="limiter">
                <div class="container-login100">
                    <div class="wrap-login100">
                        <div class="login100-pic">
                            <img src={VrImage} alt="IMG"/>
                        </div>
                        <div class="login-box">
                            <h2>Meta School Login</h2>
                            <div className="login-div">
                                <div class="user-box">
                                    <input type="text" minLength="3" maxLength="20" required onChange={(e)=>{ setUsername(e.target.value)}} placeholder="User Name" />
                                </div>
                                <div class="user-box">
                                    <input type="password"  name="password" minLength="8" maxLength="20" required onChange={(e)=>{ setPassword(e.target.value)}} placeholder="Password" />
                                </div>
                                {save_msg !== "" ?
                                <div className='save-info'>
                                    <p>{save_msg}</p>
                                </div> : ""
                                }
                                <div className="submit-box">
                                    <button type="submit" onClick={signup}>                    
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        Sign Up</button>
                                    <button type="submit" onClick={authorization}>                    
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer fluid />
            </div>
        </>
    );
    
}

export default UserLogin;

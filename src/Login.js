import { Button } from '@material-ui/core'
import React from 'react'
import { auth, provider } from './firebase'
import './Login.css'
import { actionTypes } from './Reducer'
import { useStateValue } from './StateProvider'
import logo from "./logo.png"
function Login() {
    const [{},dispatch]=useStateValue();
    const signIn= ()=>{
        auth.signInWithPopup(provider).then(result=>
           dispatch({
               type: actionTypes.SET_USER,
               user:result.user,
           })
            ).catch(error=>alert(error.message))
    }
    return (
        <div className="login">
           <div className="login_conatiner">
               <img src={logo} alt="Whatsapp LOGO"/>
               <div className="login_text typewriter-text">
               <h1> SignIn to GroupChat App</h1>
               </div>
             <Button onClick={signIn}>SignIn Using Google </Button> 
           </div>
        </div>
    )
}

export default Login

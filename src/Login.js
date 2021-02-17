import { Button } from '@material-ui/core'
import React from 'react'
import { auth, provider } from './firebase'
import './Login.css'
import { actionTypes } from './Reducer'
import { useStateValue } from './StateProvider'
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
               <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="Whatsapp LOGO"/>
               <div className="login_text">
                   <h1>Sign in to WhatsApp</h1>
               </div>
             <Button onClick={signIn}>SignIn Using Google </Button> 
           </div>
        </div>
    )
}

export default Login

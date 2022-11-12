import React from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Switch,Route,Link,useNavigate} from 'react-router-dom';
import {motion} from 'framer-motion';
import {GoogleOAuthProvider,GoogleLogin,googleLogout,useGoogleLogin} from '@react-oauth/google';
import axios from 'axios';

const GoogleCustomButton=()=>{
    const navigate=useNavigate()
    const onGoogleSignIn=useGoogleLogin({onSuccess:async tokenResponse=>{
        const userInfo =await  axios.get('https://www.googleapis.com/oauth2/v3/userinfo',
        {headers:{Authorization:`Bearer ${tokenResponse.access_token}`}}).then(res=>res.data)
        console.log(userInfo)
        localStorage.setItem('profile',JSON.stringify({result:userInfo,...tokenResponse}))
        console.log(tokenResponse)
        navigate("/")
   },onError:error=>console.log(error)})
    const handleSubmit=(e)=>{
        e.preventDefault()
    }
    return(<button type='submit' onClick={(e)=>{e.preventDefault(); onGoogleSignIn()}} onSubmit={handleSubmit}  className='btn btn-outline-secondary'><img style={{height:'25px',width:'25px'}}src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png' className='img-fluid'/>        Continue with Google</button>)
}
export default GoogleCustomButton;
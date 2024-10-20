import React, {useState} from 'react'
import Layout from '../component/Layout'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { handleError, handleSuccess } from '../component/Utils';

function ForgetPassword() {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        const copyloginInfo = {...loginInfo}
        copyloginInfo[name] = value
        setLoginInfo(copyloginInfo)
    }

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const {email, password} = loginInfo
        if(!email || !password){
           return handleError('All fields are required')
        }
        if(password.length < 5){
            return handleError('Length of password must be 5 characters long')
        }
        try{
            const url = "http://localhost:8080/user/forget-password"
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            })
            const result = await response.json()
            if(response.status === 200){
                handleSuccess('Forget Password Successfully')
                setTimeout(()=>{
                    navigate('/')
                },2000)
            }else{
                handleError('Wrong password')
            }
        }catch(err){
            console.log(err)
            handleError('An error occurs, please try again later')
        }
    }
  return (
    <Layout>
      <div className='signup-cont'>
            <div className='container'>
                <h3>Recover Password</h3>
                <form onSubmit={handleSubmit}>
                    <input type='email' onChange={handleChange} placeholder='Email' name='email' value={loginInfo.email} />
                    <input type='password' onChange={handleChange} placeholder='Confirm Password' name='password' value={loginInfo.password} />
                    <button type='submit'>Forget</button>
                    <span>Remember the password? <Link style={{color: '#0dcaf0'}} to={'/'}>Login</Link></span>
                </form>
            </div>
        </div>
        <ToastContainer />
    </Layout>
  )
}

export default ForgetPassword

import React, { useState } from 'react'
import Layout from '../component/Layout'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { handleError, handleSuccess } from '../component/Utils';

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        const copyloginInfo = { ...loginInfo }
        copyloginInfo[name] = value
        setLoginInfo(copyloginInfo)
    }

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const { email, password } = loginInfo
        if (!email || !password) {
            return handleError('All fields are required')
        }
        if (password.length < 5) {
            return handleError('Length of password must be 5 characters long')
        }
        try {
            const url = "http://localhost:8080/user/login"
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            })
            const result = await response.json()
            if (response.status === 200) {
                handleSuccess('Login Successfully')
                localStorage.setItem('token', result.token)
                setTimeout(() => {
                    navigate('/home')
                }, 2000)
            } else {
                handleError('Wrong password')
            }
        } catch (err) {
            console.log(err)
            handleError('An error occurs, please try again later')
        }
    }
    return (
        <Layout>
            <div className='signup-cont'>
                <div className='container'>
                    <h3>Login</h3>
                    <form onSubmit={handleSubmit}>
                        <input type='email' onChange={handleChange} placeholder='Email' name='email' value={loginInfo.email} />
                        <input type='password' onChange={handleChange} placeholder='Password' name='password' value={loginInfo.password} />
                        <button type='submit'>Login</button>
                        <span><Link style={{ color: '#0dcaf0', marginTop: '15px', textAlign: 'center' }} to={'/forget-password'}>Forget your password?</Link></span>
                        <span>Don't have an account? <Link style={{ color: '#0dcaf0' }} to={'/signup'}>Signup</Link></span>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </Layout>
    )
}

export default Login

import React, { useState } from 'react'
import Layout from '../component/Layout'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { handleError, handleSuccess } from '../component/Utils';

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        const copySignupInfo = {...signupInfo}
        copySignupInfo[name] = value
        setSignupInfo(copySignupInfo)
    }

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const {name, email, password, phone, address} = signupInfo
        if(!name || !email || !password || !phone || !address){
           return handleError('All fields are required')
        }
        if(name.length < 3){
            return handleError('Length of name must be 3 characters long')
        }
        if(password.length < 5){
            return handleError('Length of password must be 5 characters long')
        }
        if(phone.length < 11){
            return handleError('Length of phone-no must be 11 characters long')
        }
        if(address.length < 3){
            return handleError('Length of address must be 3 characters long')
        }
        try{
            const url = "http://localhost:8080/user/signup"
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            })
            const result = await response.json()
            if(response.status === 200){
                handleSuccess('Signup Successfully')
                setTimeout(()=>{
                    navigate('/')
                },2000)
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
                <h3>Signup</h3>
                <form onSubmit={handleSubmit}>
                    <input type='text' onChange={handleChange} placeholder='Name' name='name' value={signupInfo.name} />
                    <input type='email' onChange={handleChange} placeholder='Email' name='email' value={signupInfo.email} />
                    <input type='password' onChange={handleChange} placeholder='Password' name='password' value={signupInfo.password} />
                    <input type='text' onChange={handleChange} placeholder='Phone-No' name='phone' value={signupInfo.phone} />
                    <input type='text' onChange={handleChange} placeholder='Address' name='address' value={signupInfo.address} />
                    <button type='submit'>Signup</button>
                    <span>Already have an account? <Link style={{color: '#0dcaf0'}} to={'/'}>Login</Link></span>
                </form>
            </div>
        </div>
        <ToastContainer />
    </Layout>
  )
}

export default Signup

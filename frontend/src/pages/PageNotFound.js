import React from 'react'
import Layout from './../component/Layout'
import { useNavigate } from 'react-router-dom'

function PageNotFound() {
  const navigate = useNavigate()
  return (
    <Layout>
      <div className='pageNotFound-cont'>
        <h1>404</h1>
        <h1>Page not found</h1>
        <p>We are sorry, the page you requested could not be found</p>
        <p className='p'>Please go back to the homepage.</p>
        <button onClick={() => { navigate('/home') }} className='btn btn-outline-secondary'>Go Back</button>
      </div>
    </Layout>
  )
}

export default PageNotFound

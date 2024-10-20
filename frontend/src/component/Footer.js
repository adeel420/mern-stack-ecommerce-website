import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='footer-cont'>
      <h3>Copyright &copy; by Ecommerce</h3>
      <ul>
        <Link style={{ color: '#0dcaf0' }} to={'/about'}>About</Link> | <Link style={{ color: '#0dcaf0' }} to={'/contact'}>Contact</Link>
      </ul>
    </div>
  )
}

export default Footer

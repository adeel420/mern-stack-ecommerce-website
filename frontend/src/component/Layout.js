import React from 'react'
import Header from './Header'
import Footer from './Footer'

function Layout({ children }) {
  return (
    <div className="page-container">
      <Header />
      <div className='layout-cont'>{children}</div>
      <div className='foot'>
        <Footer />
      </div>
    </div>
  )
}

export default Layout

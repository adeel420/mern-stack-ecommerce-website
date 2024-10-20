import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { handleError, handleSuccess } from '../component/Utils';
import { FaCartShopping } from "react-icons/fa6";
import { useCart } from '../context/CartContext';

function Header() {
  const [loginName, setLoginName] = useState('')
  const [role, setRole] = useState('')
  const [categories, setCategories] = useState([])
  const [cart] = useCart()

  const token = localStorage.getItem('token');

  const fetchName = async () => {
    try {
      const url = "http://localhost:8080/user/name";
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      setLoginName(result.name);
      setRole(result.role)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchName();
  }, []);


  const navigate = useNavigate()
  const handleLogout = () => {
    handleSuccess('Logout Successfully')
    localStorage.removeItem('token')
    setTimeout(() => {
      navigate('/')
    }, 2000)
  }

  const getCategories = async () => {
    try {
      const url = "http://localhost:8080/category/"
      const response = await fetch(url)
      const result = await response.json()
      setCategories(result)
    } catch (err) { }
  }
  useEffect(() => {
    getCategories()
  }, [])

  const location = useLocation()
  const authData = location.pathname === '/' || location.pathname === '/signup' || location.pathname === '/forget-password'
  return (
    <div className='header-cont'>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand main" href="#">Ecommerce</a>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 center">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/home">Home</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Category
                </a>
                <ul class="dropdown-menu drop-down">
                  <li><a class="dropdown-item" href="/all-categories">All Categories</a></li>
                  {categories.map((c) => (
                    <li><a class="dropdown-item" href={`/category-products/${c.name}`}>{c.name}</a></li>
                  ))}
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact">Contact</a>
              </li>
            </ul>
            {authData ? (
              <>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 last">
                  <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="/">Login</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/signup">Signup</a>
                  </li>
                </ul>
              </>
            ) : (
              <>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 last">
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      {loginName}
                    </a>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href={role === 1 ? '/admin' : '/user'}>Dashboard</a></li>
                      <li onClick={handleLogout}><a className="dropdown-item" href="#">Logout</a></li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/cart">
                      <span className='cart-logo' style={{ fontSize: '18px' }}>
                        <FaCartShopping />
                      </span>
                      <span className="position-absolute start-100 translate-middle badge rounded-pill bg-danger my-1 cartTag">
                        {cart.length}
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    </a>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </nav>
      <ToastContainer />
    </div>
  )
}

export default Header

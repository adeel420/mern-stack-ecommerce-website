import React, { useEffect, useState } from 'react'
import Layout from '../component/Layout'
import { Checkbox, Radio } from 'antd'
import { Prices } from '../component/Prices'
import { FaCartShopping } from "react-icons/fa6";
import { FaFilter } from "react-icons/fa";
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { ToastContainer } from 'react-toastify';
import { handleSuccess } from '../component/Utils';

function Home() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState('')
  const [inputSearch, setInputSearch] = useState('')
  const [cart, setCart] = useCart()

  const imageShow = async () => {
    try {
      const response = await axios.get("http://localhost:8080/product/")
      setProducts(response.data || [])
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
    }
  }

  useEffect(() => {
    imageShow()
  }, [])

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/category/")
      setCategories(response.data || [])
    } catch (err) {
      console.error("Error fetching categories:", err);
      setCategories([]);
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  const handleFilter = (value, id) => {
    const all = value ? [...checked, id] : checked.filter(c => c !== id)
    setChecked(all)
  }

  const getFilter = async () => {
    try {
      const filterPayload = {
        categories: checked.length > 0 ? checked : [],
        priceRange: radio || null
      }

      console.log("Filter Payload: ", filterPayload);

      const { data } = await axios.post('http://localhost:8080/product/filter', filterPayload);
      console.log("Filtered Products: ", data);
      setProducts(data || []);
    } catch (err) {
      console.error("Error while filtering products:", err);
      setProducts([]);
    }
  }

  useEffect(() => {
    if (checked.length > 0 || radio) {
      getFilter()
    } else {
      imageShow()
    }
  }, [checked, radio])

  const filterPrice = (e) => {
    setRadio(e.target.value)
  }

  const filteredSearchData = products.filter((item) => {
    return item.name.toLowerCase().includes(inputSearch.toLocaleLowerCase())
  })
  return (
    <Layout>
      <div className='front-pic'>
        <div className="text">
          <p>Sale</p>
          <h4>Enjoy Upto 40% off</h4>
          <h1>All Accessories - Limited Time Only!</h1>
          <button className='btn btn-outline-dark'>Buy Now</button>
        </div>
        <div>
          <img src='main-img.png' />
        </div>
      </div>
      <div className='home-cont'>
        <div className='first-section'>
          <h3>Filter Category</h3>
          <div className='filter-cat'>
            {categories && categories.length > 0 ? (
              categories.map((c) => (
                <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                  <span>{c.name}</span>
                </Checkbox>
              ))
            ) : (
              <h3>No Categories Found.</h3>
            )}
          </div>
          <h3 className='my-5'>Filter Price</h3>
          <div className='filter-price'>
            <Radio.Group onChange={filterPrice}>
              {Prices.map((pr) => (
                <Radio key={pr.name} value={pr.array}>
                  <span>{pr.name}</span>
                </Radio>
              ))}
            </Radio.Group>
          </div>
          <button className='btn btn-danger my-4' onClick={() => { window.location.reload() }}>
            <FaFilter /> Remove Filter
          </button>
        </div>
        <div className='second-section'>
          <h3>All Products</h3>
          <form class="d-flex search" role="search">
            <input value={inputSearch} onChange={(e) => { setInputSearch(e.target.value) }} class="form-control me-2" type="search" placeholder="Search the products..." aria-label="Search" />
          </form>
          <div className='card-cont'>
            {filteredSearchData && filteredSearchData.length > 0 ? (
              filteredSearchData.map((p) => (
                <div className="card" style={{ width: '18rem' }} key={p._id}>
                  <img src={`http://localhost:8080/product/Images/${p.image}`} height={'260px'} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.length > 28 ? `${p.description.substring(0, 28)}...` : p.description}</p>
                    <h5 style={{ fontWeight: 'bold' }} className="card-title">{p.price}Rs</h5>
                    <a className='btn btn-danger' href={`/product-details/${p.name}`} >Details</a>
                    <button className='btn btn-dark cart' onClick={() => { setCart([...cart, p]); localStorage.setItem('cart', JSON.stringify([...cart, p])) }}><FaCartShopping /></button>
                  </div>
                </div>
              ))
            ) : (
              <h2 className='none-product'>No Products Found</h2>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  )
}

export default Home;

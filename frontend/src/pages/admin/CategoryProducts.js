import React, { useEffect, useState } from 'react'
import Layout from '../../component/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { FaCartShopping } from "react-icons/fa6";
import { useCart } from '../../context/CartContext';

function CategoryProducts() {
    const [category, setCategory] = useState([])
    const [products, setProducts] = useState([])
    const [cart, setCart] = useCart()

    const params = useParams()

    const getSingleCategory = async () => {
        const response = await axios.get(`http://localhost:8080/product/category-wise/${params.name}`)
        setCategory(response.data.category)
        console.log(response.data)
        setProducts(response.data.products)
    }
    useEffect(() => {
        getSingleCategory()
    }, [params.name])
    return (
        <Layout>
            <div className='categoryProduct-cont'>
                <h3 className="top">Category: <span>{category.name}</span></h3>
                <h3 className="second">{products.length} result found</h3>
                <div className='card-cont'>
                    {products.map((p) => (
                        <div className="card" style={{ width: '18rem' }} key={p._id}>
                            <img src={`http://localhost:8080/product/Images/${p.image}`} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{p.name}</h5>
                                <p className="card-text">{p.description.length > 28 ? `${p.description.substring(0, 28)}...` : p.description}</p>
                                <h5 style={{ fontWeight: 'bold' }} className="card-title">{p.price}Rs</h5>
                                <a className='btn btn-danger' href={`/product-details/${p.name}`} >Details</a>
                                <button className='btn btn-dark cart' onClick={() => { setCart([...cart, p]); localStorage.setItem('cart', JSON.stringify([...cart, p])) }}><FaCartShopping /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default CategoryProducts

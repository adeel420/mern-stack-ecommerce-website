import React, { useEffect, useState } from 'react'
import Layout from '../../component/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { FaCartShopping } from "react-icons/fa6";
import { useCart } from '../../context/CartContext';

function ProductDetails() {
    const [products, setProducts] = useState({})
    const [related, setRelated] = useState([])
    const [cart, setCart] = useCart()


    const params = useParams()
    const navigate = useNavigate()

    const getSingleProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/product/single/${params.name}`);
            const productData = response.data.data;
            setProducts(productData);
            getRelatedProduct(productData.category, productData._id);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getSingleProduct()
    }, [params.name])

    const getRelatedProduct = async (cid, pid) => {
        try {
            const response = await axios.get(`http://localhost:8080/product/related/${cid}/${pid}`);
            setRelated(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Layout>
            <div className='productDetails-cont'>
                <h3 className='title'>Details</h3>
                <button className='btn btn-dark cross' onClick={() => navigate('/home')}>&times;</button>
                <div className='container'>
                    <div className="img" style={{ width: '18rem' }}>
                        <img src={`http://localhost:8080/product/Images/${products.image}`} className="card-img-top" alt="..." />
                    </div>
                    <div className="text">
                        <span className="card-title"><span className='first'>Name:</span> <span className='second'>{products.name}</span></span> <br />
                        <span className="card-text"><span className='first'>Description:</span> <span className='second'>{products.description}</span></span> <br />
                        <span className="card-title"><span className='first'>Price:</span> <span className='second'>{products.price}Rs</span></span> <br />
                        <button className='btn btn-dark btn-cart' onClick={() => { setCart([...cart, products]); localStorage.setItem('cart', JSON.stringify([...cart, products])) }}><FaCartShopping /></button>
                    </div>
                </div>
                <div>
                    <h3 className="similar">Similar Product</h3>
                    {related.length < 1 && (
                        <p className="text-center">No Similar Products found</p>
                    )}
                    <div className='card-cont'>
                        {related.map((p) => (
                            <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                                <img
                                    src={`http://localhost:8080/product/Images/${p.image}`} // Fixed image URL
                                    className="card-img-top"
                                    alt={p.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0, 30)}...</p>
                                    <p className="card-text"> $ {p.price}</p>
                                    <button
                                        className="btn btn-danger ms-1"
                                        onClick={() => navigate(`/product-details/${p.name}`)}
                                    >
                                        More Details
                                    </button>
                                    <button className="btn btn-dark cart" onClick={() => { setCart([...cart, p]); localStorage.setItem('cart', JSON.stringify([...cart, p])) }}><FaCartShopping /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ProductDetails

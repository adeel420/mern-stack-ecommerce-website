import React, { useEffect, useState } from 'react';
import Layout from '../component/Layout';
import { useCart } from '../context/CartContext';
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { handleSuccess } from '../component/Utils';
import { ToastContainer } from 'react-toastify';

function CartPage() {
    const [cart, setCart] = useCart() || [[], () => { }];  // Ensure cart is initialized
    const [loginName, setLoginName] = useState('');
    const [address, setAddress] = useState('');
    const [clientToken, setClientToken] = useState('');
    const [select, setSelect] = useState({})
    const [instance, setInstance] = useState('');
    const [loading, setLoading] = useState(false);
    const [updatedName, setUpdatedName] = useState('');

    const getToken = async () => {
        try {
            const response = await axios.get('http://localhost:8080/product/client-token');
            setClientToken(response.data.clientToken);
        } catch (err) {
            console.log(err);
        }
    };

    const navigate = useNavigate();
    const handlePayment = async () => {
        try {
            const { nonce } = await instance.requestPaymentMethod();
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8080/product/client-payment', { nonce, cart, address }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            handleSuccess('Payment Successfully');
            setLoading(false);
            localStorage.removeItem('cart');  // Clear cart after successful payment
            setCart([]);
            navigate('/user');
        } catch (err) {
            console.log(err);
        }
    };

    useState(() => {
        getToken();
    }, []);

    const params = useParams();
    const token = localStorage.getItem('token');

    const removeCart = (pid) => {
        const updatedCart = cart.filter(item => item._id !== pid);
        setCart(updatedCart);
        localStorage.setItem(`cart_${token}`, JSON.stringify(updatedCart));
    };

    const fetchName = async () => {
        try {
            const response = await fetch('http://localhost:8080/user/name', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const result = await response.json();
            setLoginName(result.name);
            setAddress(result.address);
        } catch (err) {
            console.log(err);
        }
    };

    const totalPrice = () => {
        return cart.reduce((total, item) => total + item.price, 0);
    };

    useEffect(() => {
        fetchName();
    }, []);

    const handleUpdateAddress = async () => {
        if (!select || !select._id) {
            console.error("User ID is undefined");
            return;
        }

        try {
            const response = await axios.put(`http://localhost:8080/user/update-address/${select._id}`, {
                address: updatedName || address,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log(response.data);
            setAddress(updatedName || address);

            setSelect('');
        } catch (err) {
            console.error("Error updating address:", err);
        }
    };
    useEffect(() => {
        console.log("Select value: ", select); // See if select is set properly
    }, [select]);



    return (
        <Layout>
            <div className='cartPage-cont'>
                <div className='first-section'>
                    <h3>Hello {loginName.charAt().toUpperCase() + loginName.slice(1).toLowerCase()}</h3>
                    {cart && cart.length > 0 ? (
                        <h4>You have {cart.length} items in your cart</h4>
                    ) : (
                        <h4>Your Cart is Empty</h4>
                    )}
                </div>
                <div className='cart-details'>
                    <div className='cart-product'>
                        {cart && cart.map((p) => (
                            <div key={p._id} className='cart-product-img'>
                                <img src={`http://localhost:8080/product/Images/${p.image}`} height={'260px'} className="card-img-top" alt="..." />
                                <div className='cart-product-product'>
                                    <span>Name: <span className='first'>{p.name}</span> </span>
                                    <span>Description: <span className='first'>{p.description.length > 28 ? `${p.description.substring(0, 28)}...` : p.description}</span></span>
                                    <span>Price: <span className='first'>{p.price}Rs</span></span>
                                    <button onClick={() => removeCart(p._id)} className='btn btn-danger'>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='cart-payment'>
                        <h3 className='text-center'>Cart Summary</h3>
                        <p style={{ fontSize: '16px' }} className='text-center'>Total | Checkout | Payment</p>
                        <hr />
                        <h5><span style={{ fontWeight: 'bold' }}>Total:</span> {totalPrice()}Rs</h5>
                        {/* <div className='update'>
                            <input
                                type='text'
                                value={updatedName || address}
                                onChange={(e) => setUpdatedName(e.target.value)}
                            />
                            <br />
                            <button
                                onClick={handleUpdateAddress}
                                className='btn btn-dark'
                            >
                                Update Address
                            </button>
                        </div> */}
                        <div className='payment'>
                            {clientToken &&
                                <DropIn
                                    options={{
                                        authorization: clientToken,
                                        paypal: {
                                            flow: 'vault'
                                        }
                                    }}
                                    onInstance={(instance) => { setInstance(instance); }}
                                />
                            }
                            <button className='btn btn-dark' onClick={handlePayment}>Payment</button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </Layout>
    );
}

export default CartPage;

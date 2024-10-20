import axios from 'axios'
import React, { useEffect, useState } from 'react'
import moment from 'moment'

function Orders() {
    const [orders, setOrders] = useState([])

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get('http://localhost:8080/product/get-orders', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(response.data)
            setOrders(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    return (
        <div className='orders-cont'>
            <h3>Orders</h3>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Status</th>
                            <th scope="col">Buyer</th>
                            <th scope="col">Orders</th>
                            <th scope="col">Payment</th>
                            <th scope="col">Quantity</th>
                        </tr>
                    </thead>
                    {orders.length > 0 ? orders.map((o, i) => (
                        <tbody key={i}>
                            <tr>
                                <th scope="row">{i + 1}</th>
                                <td>{o.status}</td>
                                <td>{o.buyer ? o.buyer.name : 'Unknown'}</td>
                                <td>{moment(o.createdAt).fromNow()}</td>
                                <td>{o.payment && o.payment.success ? 'Success' : 'Failed'}</td>
                                <td>{o.products ? o.products.length : 0}</td>
                            </tr>
                            <tr>
                                <td colSpan="6">
                                    <div className='cart-details'>
                                        <div className='cart-product'>
                                            {Array.isArray(o.products) && o.products.length > 0 ? ( // Check if o.products is an array
                                                o.products.map((p) => (
                                                    <div key={p._id} className='cart-product-img'>
                                                        <img src={`http://localhost:8080/product/Images/${p.image}`} height={'260px'} className="card-img-top" alt={p.name} />
                                                        <div className='cart-product-product'>
                                                            <span>Name: <span className='first'>{p.name}</span> </span>
                                                            <span>Description: <span className='first'>{p.description && p.description.length > 28 ? `${p.description.substring(0, 28)}...` : p.description}</span></span>
                                                            <span>Price: <span className='first'>{p.price}Rs</span></span>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>No products available</p>
                                            )}
                                        </div>
                                    </div>


                                </td>
                            </tr>
                        </tbody>
                    )) : (
                        <tbody>
                            <tr>
                                <td colSpan="6">No orders found</td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    )
}

export default Orders

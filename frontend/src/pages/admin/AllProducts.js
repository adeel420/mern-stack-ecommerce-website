import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function AllProducts() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [products, setProducts] = useState([])

    const imageShow = async () => {
        try {
            const url = "http://localhost:8080/product/"
            const response = await fetch(url)
            const result = await response.json()
            setImage(result.image)
            setProducts(result)
        } catch (err) { }
    }

    useEffect(() => {
        imageShow()
    }, [])
    return (
        <div className='allProduct-cont'>
            <h3>All Products</h3>
            <div className='card-cont'>
                {products.map((p) => (
                    <Link style={{ textDecoration: 'wavy' }} to={`/update-product/${p.name}`}>
                        <div className="card" style={{ width: '18rem' }} key={p._id}>
                            <img src={`http://localhost:8080/product/Images/${p.image}`} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{p.name}</h5>
                                <p className="card-text">{p.description.length > 28 ? `${p.description.substring(0, 28)}...` : p.description}</p>
                                <h5 style={{ fontWeight: 'bold' }} className="card-title">{p.price}Rs</h5>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default AllProducts

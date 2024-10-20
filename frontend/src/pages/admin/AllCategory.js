import React, { useEffect, useState } from 'react'
import Layout from '../../component/Layout'
import { useNavigate } from 'react-router-dom'

function AllCategory() {
    const [categories, setCategories] = useState([])

    const navigate = useNavigate()

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
    return (
        <Layout>
            <div className='allCategory-cont'>
                <h3 className='top'>All Categories</h3>
                <div className='container'>
                    {categories.map((c) => (
                        <button onClick={() => { navigate(`/category-products/${c.name}`) }} className='btn btn-outline-dark' key={c._id}>{c.name}</button>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default AllCategory

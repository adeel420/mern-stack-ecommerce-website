import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { ToastContainer } from 'react-toastify'
import { handleSuccess } from '../../component/Utils'
import Layout from '../../component/Layout'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const { Option } = Select


function UpdateProduct() {
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState([])
    const [file, setFile] = useState(null)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [image, setImage] = useState('')
    const [shipping, setShipping] = useState('')
    const [id, setId] = useState('')

    const params = useParams()
    const singleProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/product/single/${params.name}`)
            console.log(response.data.data._id)
            setId(response.data.data._id)
            setName(response.data.data.name)
            setDescription(response.data.data.description)
            setPrice(response.data.data.price)
            setQuantity(response.data.data.quantity)
            setShipping(response.data.data.shipping)
            setFile(response.data.data.image)
            setImage(`http://localhost:8080/product/Images/${response.data.data.image}`)
            setCategory(response.data.data.category)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        singleProduct()
    }, [])

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

    const handleShowSetImage = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setImage(URL.createObjectURL(selectedFile));
    }

    const navigate = useNavigate()

    const handleUpdate = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('file', file)
        formData.append('name', name)
        formData.append('category', category)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('quantity', quantity)
        formData.append('shipping', shipping)
        try {
            const response = await axios.put(`http://localhost:8080/product/update/${id}`, formData)
            handleSuccess('Product Updated Successfully')
            navigate('/admin')
        } catch (err) {
            console.log(err)
        }
    }

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:8080/product/delete/${id}`)
            handleSuccess('Deleted Successfully')
            navigate('/admin')
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <Layout>
            <div className='createProduct-cont'>
                <h3>Update Product</h3>
                <div className='scroll'>
                    <div className='cat'>
                        <Select className='w-75' placeholder='Choose Category...' showSearch onChange={(value) => { setCategory(value) }} value={category}>
                            {categories.map((c) => (
                                <Option key={c._id} value={c._id}>{c.name}</Option>
                            ))}
                        </Select>
                    </div>
                    <form>
                        <label className='btn btn-outline-secondary'>
                            {file && 'Change image'}
                            <input accept="image/*" type='file' onChange={handleShowSetImage} hidden />
                        </label>
                        <div className='img'>
                            {image && <img src={image} height={'150px'} width={'150px'} alt='Product' />}

                        </div>
                        <input type='text' value={name} onChange={(e) => { setName(e.target.value) }} name='name' placeholder='Write Name...' />
                        <textarea type='text' value={description} onChange={(e) => { setDescription(e.target.value) }} name='description' rows={'4'} placeholder='Write Description...' />
                        <input type='number' value={price} onChange={(e) => { setPrice(e.target.value) }} name='price' placeholder='Write Price...' />
                        <input type='number' value={quantity} onChange={(e) => { setQuantity(e.target.value) }} name='quantity' placeholder='Write Quantity...' />
                        <div className='cat-2'>
                            <Select value={shipping ? 'Yes' : 'No'} onChange={(value) => { setShipping(value) }} placeholder='Choose Shipping...' className='w-75'>
                                <Option value='1'>Yes</Option>
                                <Option value='0'>No</Option>
                            </Select>
                        </div>
                        <button className='upload' onClick={handleUpdate} >Update</button>
                        <button className='btn btn-danger' style={{ marginTop: '15px', width: '415px' }} onClick={handleDelete} >Delete</button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </Layout>
    )
}

export default UpdateProduct

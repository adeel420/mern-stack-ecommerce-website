import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { ToastContainer } from 'react-toastify'
import { handleSuccess } from '../../component/Utils'
import { useNavigate } from 'react-router-dom'

const { Option } = Select

function CreateProduct() {
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState([])
    const [file, setFile] = useState(null)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [shipping, setShipping] = useState('')

    const navigate = useNavigate()

    const upload = async (e) => {
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
            const url = "http://localhost:8080/product/upload"
            const response = await fetch(url, {
                method: 'POST',
                body: formData
            })
            const result = await response.json()
            handleSuccess('Product created successfully')
            navigate('/admin')
        } catch (err) {
            console.log(err)
        }
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

    const handleShowSetImage = (e) => {
        const showFile = e.target.files[0]
        setFile(showFile)
    }
    return (
        <div className='createProduct-cont'>
            <h3>Create Product</h3>
            <div className='scroll'>
                <div className='cat'>
                    <Select className='w-75' placeholder='Choose Category...' showSearch
                        onChange={(value) => { setCategory(value) }}>
                        {categories.map((c) => (
                            <Option key={c._id} value={c._id}>{c.name}</Option>
                        ))}
                    </Select>
                </div>
                <form>
                    <label className='btn btn-outline-secondary'>
                        {file ? file.name : 'Upload Image'}
                        <input type='file' accept="image/*" onChange={handleShowSetImage} hidden />
                    </label>
                    <div className='img'>
                        {file && (
                            <img src={URL.createObjectURL(file)} height={'150px'} width={'150px'} />
                        )}
                    </div>
                    <input type='text' value={name} onChange={(e) => { setName(e.target.value) }} name='name' placeholder='Write Name...' />
                    <textarea type='text' value={description} onChange={(e) => { setDescription(e.target.value) }} name='description' rows={'4'} placeholder='Write Description...' />
                    <input type='number' value={price} onChange={(e) => { setPrice(e.target.value) }} name='price' placeholder='Write Price...' />
                    <input type='number' value={quantity} onChange={(e) => { setQuantity(e.target.value) }} name='quantity' placeholder='Write Quantity...' />
                    <div className='cat-2'>
                        <Select onChange={(value) => { setShipping(value) }} placeholder='Choose Shipping...' className='w-75'>
                            <Option value='1'>Yes</Option>
                            <Option value='0'>No</Option>
                        </Select>
                    </div>
                    <button className='upload' onClick={upload}>Upload</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default CreateProduct

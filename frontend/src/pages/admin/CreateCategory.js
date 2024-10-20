import React, { useEffect, useState } from 'react'
import CategoryForm from '../../component/forms/CategoryForm'
import { handleSuccess } from '../../component/Utils'
import { ToastContainer } from 'react-toastify'
import axios from 'axios'

function CreateCategory() {
    const [categories, setCategories] = useState([])
    const [name, setName] = useState('')
    const [openPopup, setOpenPopup] = useState(false)
    const [updatedName, setUpdatedName] = useState('')
    const [selected, setSelected] = useState(null)

    const handlePopup = () => {
        setOpenPopup(!openPopup)
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:8080/category/create", { name })
            handleSuccess(`${response.data.name} is created`)
            setName('')
            getCategories()
        } catch (err) {
            console.log(err)
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try{
            const response = await axios.put(`http://localhost:8080/category/update/${selected._id}`, {name: updatedName})
            handleSuccess(`${updatedName} is updated successfully`)
            setSelected(null)
            setUpdatedName('')
            setOpenPopup(false)
            getCategories()
        }catch (err) {
            console.log(err)
        }
    }

    const handleDelete = async (id) => {
        try{
            const response = await axios.delete(`http://localhost:8080/category/delete/${id}`)
            handleSuccess(`${response.data.name} category is deleted successfully`)
            getCategories()
        }catch(err){
            console.log(err)
        }
    }
    return (
        <>
            <div className='createCategory-cont'>
                <h3>Create Category</h3>
                <div>
                    <CategoryForm value={name} setValue={setName} handleSubmit={handleSubmit} />
                </div>
                <div className='table-cont'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Category</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.length > 0 ? (
                                categories.map((c) => (
                                    <tr key={c._id}>
                                        <td>{c.name}</td>
                                        <td>
                                            <button className='btn btn-outline-secondary' onClick={()=>{handlePopup(); setUpdatedName(c.name); setSelected(c)}}>Edit</button>
                                            <button className='btn btn-outline-danger mx-3' onClick={()=>{handleDelete(c._id)}}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <>
                                    <h5 style={{textAlign: 'center', fontWeight: 'bold', marginTop: '60px'}}>No Category Created</h5>
                                </>
                            )}
                                    </tbody>
                    </table>
                        
                </div>
            </div>
                <div className='cont' style={{display: openPopup ? 'block' : 'none'}}>
                    <button className='times-btn' onClick={()=>{handlePopup(false)}}>&times;</button>
                    <div className='cont-popup'>
                        <CategoryForm title="Edit" value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
                    </div>
                </div>
            <ToastContainer />
        </>
    )
}

export default CreateCategory

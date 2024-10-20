import React from 'react'

function CategoryForm({value, setValue, handleSubmit}) {
  return (
    <div className='categoryForm-cont'>
      <form onSubmit={handleSubmit}>
        <input type='text' value={value} placeholder='Create Category...' onChange={(e)=>setValue(e.target.value)} />
        <button>Create</button>
      </form>
    </div>
  )
}

export default CategoryForm

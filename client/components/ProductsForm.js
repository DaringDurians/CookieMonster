import React from 'react'

const ProductsForm = props => {
  const {handleSubmit, category} = props
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Product Name</label>
      <input type="text" name="name" required />
      <label htmlFor="price">Price</label>
      <input type="text" name="price" required />
      <label htmlFor="description">Description</label>
      <input type="text" name="description" required />
      <label htmlFor="imgUrl">Image URL</label>
      <input type="text" name="imgUrl" required />
      <button type="submit">Submit</button>
    </form>
  )
}

export default ProductsForm

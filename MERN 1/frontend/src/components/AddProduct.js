import React, { useState, useEffect } from 'react'

const AddProduct = () => {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [company, setCompany] = useState();
  const [category, setCategory] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!name || !price || !company || !category) {
      setError(true);
    } else {
      setError(false);
    }
  }, [name, price, company, category]);
  const handleAdd = async () => {
    console.log({name, price, company, category});
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify({name, price,category, company }),
      headers: {
        "Content-Type" : "application/json"
      }
    })
    const newresult = await result.json();
    console.log(newresult);
  }
  return (
    <div className='product'>
      <h1>Add Product</h1>
      <input className='inputbox' type='text' placeholder='Enter product name'
      onChange={(e) => setName(e.target.value)} value={name}></input>
      {error && !name && <span className='invalid-input'>Enter valid name. </span>}
      <input className='inputbox' type='text' placeholder='Enter product price'
      onChange={(e) => setPrice(e.target.value)} value={price}></input>
      {error && !price && <span className='invalid-input'>Enter valid price. </span>}
      
      
      <input className='inputbox' type='text' placeholder='Enter product category'
      onChange={(e) => setCategory(e.target.value)} value={category}></input>
      {error && !category && <span className='invalid-input'>Enter valid category name. </span>}

      <input className='inputbox' type='text' placeholder='Enter product company'
      onChange={(e) => setCompany(e.target.value)} value={company}></input>
      {error && !company && <span className='invalid-input'>Enter valid company name. </span>}
      <button onClick={handleAdd} className="btn">Add Product</button>
    </div>
  )
}

export default AddProduct

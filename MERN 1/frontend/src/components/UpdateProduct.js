import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const UpdateProduct = () => {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [company, setCompany] = useState();
  const [category, setCategory] = useState();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  },[])
  const getProductDetails= async() => {
    console.log(params);
    let result = await fetch(`http://localhost:5000/product/${params.id}`);
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
    // console.log(result);
  }

  const handleUpdate = async () => {
    console.log({name, price, category, company})
    let result = await fetch(`http://localhost:5000/product/${params.id}`,{
      method: "put",
      body: JSON.stringify({name, price, category, company}),
      headers: {
        "Content-Type" : "application/json"
      }
    });

    result = await result.json();
    console.log(result);
    navigate('/');
  }
  return (
    <div className='product'>
      <h1>Update Product</h1>
      <input className='inputbox' type='text' placeholder='Enter product name'
      onChange={(e) => setName(e.target.value)} value={name}></input>

      <input className='inputbox' type='text' placeholder='Enter product price'
      onChange={(e) => setPrice(e.target.value)} value={price}></input>

      <input className='inputbox' type='text' placeholder='Enter product category'
      onChange={(e) => setCategory(e.target.value)} value={category}></input>

      <input className='inputbox' type='text' placeholder='Enter product company'
      onChange={(e) => setCompany(e.target.value)} value={company}></input>
      <button onClick={handleUpdate} className="btn">Update Product</button>
    </div>
  )
}

export default UpdateProduct;

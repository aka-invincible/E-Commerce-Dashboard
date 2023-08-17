import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem('user');
    if(auth)
      navigate('/');
  })
  const handleLogIn = async() => {
    let result = await fetch("http://localhost:5000/login", {
          method: 'post',
          body: JSON.stringify({email, password}),
          headers: {
            "Content-Type": "application/json"
          },
    })
    const newResult = await result.json();
    console.log(newResult.name);
    if(newResult.auth)
    {
      localStorage.setItem("user", JSON.stringify(newResult.user));
      localStorage.setItem("token", JSON.stringify(newResult.auth));
      navigate("/");
      console.log("wrong");
    }
    else{
      alert("Wrong email or password");
    }
  }
  return (
    <div className='signup'>
      <h1>Login</h1>
      <input className="inputbox" type='text' onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email'></input>
      <input className="inputbox" type='password' onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password'></input>
      <button className="btn" onClick={handleLogIn} >Log In</button>
    </div>
  )
}

export default Login

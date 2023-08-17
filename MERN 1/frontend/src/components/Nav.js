import React from 'react';
import link, { Link, useNavigate } from 'react-router-dom'

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate("/signup");
    }
    return(
        <>
            <img alt='logo' className='logo' src='https://cdn.logojoy.com/wp-content/uploads/2018/08/23162119/wordpress-logo-1024x553.png'></img>
          {auth ?  <ul className='nav-ul'>
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add Products</Link></li>
                <li><Link to="/update/:id">Update Products</Link></li>
                <li><Link to="/profile">Profile ({JSON.parse(auth).name})</Link></li>
                <li><Link onClick={logout} to="/signup">Logout</Link></li>
            </ul>:
                <ul className='nav-ul nav-right'>
                    <li><Link to="/signup">SignUp</Link></li>
                    <li><Link to="/login">LogIn</Link></li>
                </ul>
            }
        </>
    )
}

export default Nav
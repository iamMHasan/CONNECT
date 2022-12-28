import React, { useContext } from 'react';
import {Link} from 'react-router-dom'
import { AuthContext } from '../Context/AuthProvider';

const Navbar = () => {
  const {logOut, user} = useContext(AuthContext)
  const handleLogOut = () =>{
    logOut()
    .then(()=>{})
  }
    return (
        <nav className="
        relative
        w-full
        flex flex-wrap
        items-center
        justify-between
        py-4
        text-gray-500
        hover:text-gray-700
        focus:text-gray-700
        
        navbar navbar-expand-lg 
        ">
        <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
        <button className="
            navbar-toggler
            text-gray-500
            border-0
            hover:shadow-none hover:no-underline
            py-2
            px-2.5
            bg-transparent
            focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline
          " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars"
          className="w-6" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path fill="currentColor"
            d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z">
          </path>
        </svg>
        </button>
        <div className="collapse navbar-collapse flex-grow items-center" id="navbarSupportedContent">
        <Link to='/' className="text-xl text-black" href="#">CONNECT</Link>
        {/* <!-- Left links --> */}
        <ul className="navbar-nav flex flex-col pl-0 list-style-none mx-auto">
          <li className="nav-item px-2">
            <Link to='/' className="nav-link active" aria-current="page" href="#">Home</Link>
            <Link to='/media' className="nav-link active" aria-current="page" href="#">Media</Link>
            
            {
              user?.uid ? <button onClick={handleLogOut} className="nav-link active text-red-900" aria-current="page" href="#">Logout</button>
               :
              <Link to='/login' className="nav-link active" aria-current="page" href="#">Login</Link>
            }
            <Link to='/about' className="nav-link active" aria-current="page" href="#">My Profile</Link>
          </li>
        </ul>
        
        {/* <!-- Left links --> */}
        </div>
        {/* <!-- Collapsible wrapper --> */}
        </div>
          </nav>
    );
};

export default Navbar;
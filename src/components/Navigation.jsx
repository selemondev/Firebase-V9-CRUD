import React from 'react'
import { UserAuth } from "../Context/AuthContext";
import {Link} from "react-router-dom";
function Navigation() {
    const { user, logOut } = UserAuth();

    const handleLogOut = async () => {
      await logOut()
    }
  return (
    <>
    <header>
        <nav className='bg-blue-500 w-full h-12 flex justify-between place-items-center p-5'>
            <div>
                <h1 className='font-bold text-white cursor-pointer'><Link to="/">Formik Validation</Link></h1>
            </div>

            <div className=''>
               { user ? (<><h4 className=' text-white hover:text-red-500 cursor-pointer font-bold rounded-md' onClick={() => handleLogOut()}>Log Out</h4></>) : (<><h4 className='font-bold text-white'><Link to="/register">Register</Link></h4></>)}
            </div>
        </nav>
    </header>
    </>
  )
}

export default Navigation
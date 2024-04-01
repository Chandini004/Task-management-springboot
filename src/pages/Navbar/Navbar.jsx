import { Avatar } from '@mui/material';
import React from 'react'
import "./Navbar.css";
import { useSelector } from 'react-redux';
const Navbar = () => {
  const {task,auth}=useSelector(store=>store)

  return (
  
    <div style={{ width: '100%' }} className='container  w-full z-10 sticky   top-0 py-3 px-5 lg:px-10 flex justify-between items-center'>

        <p className='font-bold text-lg'>task management</p> 

        <div className='flex items-center gap-5'>
            <p>{auth.user?.fullName}</p>
           <Avatar src='https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100254.jpg?t=st=1709475388~exp=1709478988~hmac=6b6cc113d8bcb8369beed5d7fd26355c79aa7c38e293bd3d1174572721cd65b2&w=740'>C</Avatar>
        </div> 
    </div>
   
  )
}
export default Navbar;
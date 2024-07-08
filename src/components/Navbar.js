import React, { useContext, useEffect, useState } from 'react'
import { Outlet, Link, useLocation, NavLink } from "react-router-dom";
import {AppContext} from '../context/AppContext';
import { IoPerson } from "react-icons/io5";
import { RiTeamFill } from "react-icons/ri";
import { IoCall } from "react-icons/io5";
import { RiPlayListAddLine } from "react-icons/ri";
import { IoLogoGithub } from "react-icons/io5";

const Navbar = () => {

  const {fetchData} = useContext(AppContext);
  const location = useLocation();
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    setShowOptions(false);
    if (location.pathname.includes("match")) {
      return;
    }
    if (location.pathname.includes("players")) {
      return;
    }
    else if (location.pathname.includes("recent")) {
      fetchData('recent');
    }
    else if (location.pathname.includes("upcoming")) {
      fetchData('upcoming');
    }
    else {
      fetchData('live');
    }

  }, [location.pathname])

  return (
    <>
        <div className="flex justify-center items-center gap-[5%] fixed top-0 w-full mx-auto text-[1.3rem] bg-[#00000075] shadow-navBox z-10">
            <Link to="/" className='text-[#e6ff43] flex gap-2'>
              <img src='/throw.png' alt='logo' className='w-8'/>
              <div>CricPulse</div>
            </Link>

            <NavLink to="/recent"
            className={({ isActive }) =>
              `cursor-pointer h-full py-3 px-1 ${isActive ? 'border-b-4 border-yellow-500' : ''}`
            }>Recent</NavLink>

            <NavLink to="/" 
            className={({ isActive }) =>
              `cursor-pointer h-full py-3 px-1 ${isActive ? 'border-b-4 border-yellow-500' : ''}`
            }>Live</NavLink>

            <NavLink to="/upcoming" 
            className={({ isActive }) =>
              `cursor-pointer h-full py-3 px-1 ${isActive ? 'border-b-4 border-yellow-500' : ''}`
            }>Upcoming</NavLink>

            <div className='relative'>
              <button onClick={() => setShowOptions(!showOptions)} className='text-[1.6rem] text-[#e6ff43] py-2 px-2 rounded-full hover:bg-[#c6ff2b14]'>
                <RiPlayListAddLine />
              </button>
              
              {
                showOptions ? (
                  <div className='absolute top-14 -left-16 bg-[#000000b3] rounded-md py-2'>
                    <div className='flex gap-3 px-4 py-2 hover:text-yellow-300'>
                      <IoPerson className='mt-1'/>
                      <Link to="/players" className='whitespace-nowrap'>Player Search</Link>
                    </div>
                    <div className='flex gap-3 px-4 py-2 hover:text-yellow-300'>
                      <RiTeamFill className='mt-1'/>
                      <Link to="/rankings/men" className='whitespace-nowrap'>ICC Rankings</Link>
                    </div>
                    <div className='flex gap-3 px-4 py-2 hover:text-yellow-300'>
                      <IoLogoGithub className='mt-1'/>
                      <div className='whitespace-nowrap'>GitHub Repo</div>
                    </div>
                    <div className='flex gap-3 px-4 py-2 hover:text-yellow-300'>
                      <IoCall className='mt-1'/>
                      <Link to="/contact-me" className='whitespace-nowrap'>Contact Me</Link>
                    </div>
                  </div>
                ) : null
              }
            </div>  
        </div>
        
        <Outlet/>
    </>
  )
}

export default Navbar
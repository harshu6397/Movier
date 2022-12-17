import './Navbar.css'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { GrHomeRounded } from 'react-icons/gr';
import { BiMoviePlay } from 'react-icons/bi'
import { RiTvLine } from 'react-icons/ri'
import { AiOutlineVideoCamera } from 'react-icons/ai'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const showMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <nav className='navbar w-full md="true" p-[1rem] bg-gray-800 md:flex md:items-center md:justify-center z-[1000]'>
            <div className='flex justify-between items-center'>
                <span className='text-2xl font-[Poppins] cursor-pointer text-white'>
                    <Link to="/" className="logo">
                        <i className='bx bx-movie-play bx-tada main-color'></i>Mov<span className="main-color">i</span>er
                    </Link>
                </span>
                <span className='text-white text-3xl md:hidden block cursor-pointer' onClick={showMenu}>
                    <ion-icon name={!isMenuOpen ? "menu" : "close"} ></ion-icon>
                </span>
            </div>
            <ul className={`menu ${isMenuOpen ? "block" : "hidden"} md:flex md:items-center md:justify-center z-[1000] md:z-auto md:static absolute w-full left-0 md:w-auto pl-5 md:opacity-100 ${!isMenuOpen ? "opacity-0" : "opacity-100"} border-t-2 top-[54px] md:border-t-0 transition-transform ease-in-out duration-500 `} >
                <li className='mx-4 my-6 md:my-0 flex gap-3'>
                    <div className="text-white text-2xl items-center md:hidden">
                        <GrHomeRounded />
                    </div>
                    <Link to='/' className='text-xl hover:text-cyan-500 duration-500 text-white'>Home</Link>
                </li>
                <li className='mx-4 my-6 md:my-0 flex gap-3'>
                    <div className="text-white text-2xl items-center md:hidden">
                        <BiMoviePlay />
                    </div>
                    <Link to='/movies' className='text-xl hover:text-cyan-500 duration-500 text-white'>Movies</Link>
                </li>
                <li className='mx-4 my-6 md:my-0 flex gap-3'>
                    <div className="text-white text-2xl items-center md:hidden">
                        <RiTvLine />
                    </div>
                    <Link to='/series' className='text-xl hover:text-cyan-500 duration-500 text-white'>Series</Link>
                </li>
                <li className='mx-4 my-6 md:my-0 flex gap-3'>
                    <div className="text-white text-2xl flex gap-3 items-center md:hidden">
                        <AiOutlineVideoCamera />
                    </div>
                    <Link to='/tv-shows' className='text-xl hover:text-cyan-500 duration-500 text-white'>Tv Shows</Link>
                </li>
                {/* <li className='mx-4 my-6 md:my-0 flex gap-3'>
                    <div className="text-white text-2xl flex gap-3 items-center md:hidden">
                        <AiOutlineVideoCamera />
                    </div>
                    <Link to='/genres' className='text-xl hover:text-cyan-500 duration-500 text-white'>Genres</Link>
                </li> */}
            </ul>
        </nav>
    )
}

export default Navbar

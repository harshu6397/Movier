import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            <footer className="section w-full">
                <div className="container text-white px-5">
                    <div className="row flex gap-10 ml-10 justify-center items-center">
                        <div className="col-4 col-md-6 col-sm-12 w-full">
                            <div className="content text-center">
                                {/* <a href="#" className="logo">
                                    <i className='bx bx-movie-play bx-tada main-color'></i>Mov<span className="main-color">i</span>er
                                </a>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut veniam ex quos hic id nobis beatae earum sapiente! Quod ipsa exercitationem officiis non error illum minima iusto et. Dolores, quibusdam?
                                </p> */}
                                <div className="social-list flex justify-center">
                                    <Link to="#" className="social-item">
                                        <i className="bx bxl-github"></i>
                                    </Link>
                                    <Link to="#" className="social-item">
                                        <i className="bx bxl-linkedin"></i>
                                    </Link>
                                    <Link to="#" className="social-item">
                                        <i className="bx bxl-twitter"></i>
                                    </Link>
                                    <Link to="#" className="social-item">
                                        <i className="bx bxl-instagram"></i>
                                    </Link>
                                </div>
                                <div className="copyright text-white border-none">
                                   &copy; 2022 Harsh Kumar | All Rights Reserved 
                                </div>
                                <div className="copyright text-white border-none">
                                    Designed and built by me, data provided by <Link className='text-cyan' to="https://www.themoviedb.org/" target='_blank' rel='noreferrer'>
                                        <span className="text-cyan-400" >TMDb</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-8 col-md-6 col-sm-12 w-3/6">
                    <div className="row md:flex flex flex-wrap gap-16">
                        <div className="col-3 col-md-6 col-sm-6">
                            <div className="content">
                                <p><b>Flix</b></p>
                                <ul className="footer-menu leading-9">
                                    <li><a href="#">About us</a></li>
                                    <li><a href="#">My profile</a></li>
                                    <li><a href="#">Pricing plans</a></li>
                                    <li><a href="#">Contacts</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-3 col-md-6 col-sm-6">
                            <div className="content">
                                <p><b>Browse</b></p>
                                <ul className="footer-menu leading-9">
                                    <li><a href="#">About us</a></li>
                                    <li><a href="#">My profile</a></li>
                                    <li><a href="#">Pricing plans</a></li>
                                    <li><a href="#">Contacts</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-3 col-md-6 col-sm-6">
                            <div className="content">
                                <p><b>Help</b></p>
                                <ul className="footer-menu leading-9">
                                    <li><a href="#">About us</a></li>
                                    <li><a href="#">My profile</a></li>
                                    <li><a href="#">Pricing plans</a></li>
                                    <li><a href="#">Contacts</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div> */}
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer

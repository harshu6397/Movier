import React from 'react'

const Footer = () => {
    return (
        <>
            <footer className="section w-full border-t-[1px] border-white border-opacity-20">
                <div className="container text-white">
                    <div className="row flex gap-10 ml-10 justify-center items-center">
                        <div className="col-4 col-md-6 col-sm-12 w-full">
                            <div className="content text-center">
                                <div className="social-list flex justify-center">
                                    <a href="https://github.com/harshu6397" className="social-item">
                                        <i className="bx bxl-github"></i>
                                    </a>
                                    <a href="https://www.linkedin.com/in/harsh-kumar-653331214/" className="social-item">
                                        <i className="bx bxl-linkedin"></i>
                                    </a>
                                    <a href="https://twitter.com/Harshu6397" className="social-item">
                                        <i className="bx bxl-twitter"></i>
                                    </a>
                                    <a href="https://www.instagram.com/harshu_6397/" className="social-item">
                                        <i className="bx bxl-instagram"></i>
                                    </a>
                                    <a href="mailto:harshkumarkardam258@gmail.com" className="social-item">
                                    <svg _ngcontent-lkn-c3="" fill="#05a6c1" height="15" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path _ngcontent-lkn-c3="" stroke='#05a6c1' d="M0 3v18h24V3H0zm21.518 2L12 12.713 2.482 5h19.036zM2 19V7.183l10 8.104 10-8.104V19H2z"></path></svg>
                                    </a>
                                </div>
                                <div className="copyright text-white border-none">
                                   &copy; 2022 Harsh Kumar | All Rights Reserved 
                                </div>
                                <div className="copyright text-white border-none">
                                    Designed and built by me, data provided by <a className='text-cyan' href="https://www.themoviedb.org/" target='_blank' rel='noreferrer'>
                                        <span className="text-cyan-400" >TMDb</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer

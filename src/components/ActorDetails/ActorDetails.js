import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import './ActorDetails.css'

const ActorDetails = () => {
    const params = useParams()
    const [detail, setDetail] = React.useState([])
    const [movieCredits, setMovieCredits] = useState();

    const getActorDetails = async (person_id) => {
        const response = await axios.get(`https://api.themoviedb.org/3/person/${person_id}?api_key=2beb22c118b4fce0394ce433a0c50f94&language=en-US`);
        console.log(response.data);
        setDetail(response.data)
    }

    const getMovieCreadits = async (person_id) => {
        const response = await axios.get(`https://api.themoviedb.org/3/person/${person_id}/movie_credits?api_key=2beb22c118b4fce0394ce433a0c50f94&language=en-US`);
        console.log(response.data);
        setMovieCredits(response.data)
    }

    useEffect(() => {
        getActorDetails(params.id)
        getMovieCreadits(params.id)
    }, [params.id])

    return (
        <div className='actor-details'>
            <Navbar />
            <div className="movie-details-overview-content w-[95%] h-full m-auto pt-4 mt-[40px] mb-[40px] border-b-2 border-black border-opacity-20 pb-[2rem]">
                <div className="movie-details-overview-content-wrapper flex flex-col">
                    <div className="upper flex flex-col items-center md:flex-row lg:flex-row xl:flex-row">
                        <div className="left movie-details-overview-content-wrapper-image text-2xl text-white md:pr-[5rem] lg:pr-[5rem]">
                            <div className="img-contrainer w-[25rem] h-[80rem] border">
                                <img className='w-full h-full' src={"https://image.tmdb.org/t/p/w780" + detail?.profile_path} alt="" />
                            </div>
                        </div>
                        <div className='right text-center lg:text-start'>
                            <div className="movie-details-ovw-[30%]erview-content-wrapper-title text-4xl text-white mb-4">
                                {detail?.name}
                            </div>
                            <div className="movie-details-overview-content-wrapper-description text-lg text-justify text-white mb-12">
                                {detail?.biography}
                            </div>
                            <div className="info text-start">
                                <div className="info-item flex gap-2 text-lg mb-2">
                                    <div className="info-item-title text-white text-opacity-50 w-[50%] md:w-[30%] lg:w-[30%]">
                                        Date of Birth
                                    </div>
                                    <div className="info-item-value text-white w-[50%] md:w-[70%] lg:w-[70%]">
                                        {detail?.birthday}
                                    </div>
                                </div>
                                <div className="info-item flex gap-2 text-lg mb-2">
                                    <div className="info-item-title text-white text-opacity-50 w-[50%] md:w-[30%] lg:w-[30%]">
                                        Place of Birth
                                    </div>
                                    <div className="info-item-value text-white w-[50%] md:w-[70%] lg:w-[70%]">
                                        {detail?.place_of_birth}
                                    </div>
                                </div>
                                <div className="info-item flex gap-2 text-lg mb-2">
                                    <div className="info-item-title text-white text-opacity-50 w-[50%] md:w-[30%] lg:w-[30%]">
                                        Known For
                                    </div>
                                    <div className="info-item-value text-white w-[50%] md:w-[70%] lg:w-[70%]">
                                        {detail?.known_for_department}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lower mt-12">
                        <div className="section-header text-white new-sd">
                            <h1 className="text-5xl leading-tight mt-0 mb-2 font-bold text-cyan-400 uppercase">
                                credits
                            </h1>
                        </div>
                        <div className='mt-8 m-auto grid grid-cols-1 md:gap-6 md:grid-cols-3 lg:grid-cols-4 2xl:grid-col-5'>
                            {
                                movieCredits?.cast?.map((item, index) => {
                                    return <div
                                        className="Carousel episode-item 2xl:w-[22rem] xl:w-[21rem] lg:w-[17rem] md:w-[19.5rem] ml-2 mr-2 my-3 movies-slide carousel-nav-center owl-carousel"
                                        key={index}
                                    >
                                        <div className=" rounded-md relative">
                                            <div className="img-container">
                                            <img className={`rounded-md object-cover`} loading="lazy" style={{ width: "100%", height: `${item.poster_path ? "37rem" : "37rem"}` }} src={"https://image.tmdb.org/t/p/original" + item.poster_path} alt="" />
                                            </div>
                                            <div className="blur-div backdrop-blur-sm w-full h-full center opacity-0 transition duration-1000 pt-4 pl-4 pr-4 pb-4 overflow-y-scroll">
                                                {item.overview}
                                            </div>
                                            <div className="movie-item-content justify-center">
                                                <div className="movie-item-title text-center">
                                                    {item.original_title}
                                                </div>
                                                <div className="movie-item-character text-center">
                                                    {item.character}
                                                </div>
                                                <div className="movie-infos justify-center">
                                                    <div className="movie-info">
                                                        <i className="bx bxs-star"></i>
                                                        <span>{item.vote_average}</span>
                                                    </div>
                                                    <div className="movie-info">
                                                        <i className="bx bx-calendar"></i>
                                                        <span>{item.release_date}</span>
                                                    </div>
                                                    <div className="movie-info">
                                                        <i className="bx bx-like"></i>
                                                        &nbsp;{item.vote_count}
                                                    </div>
                                                </div>
                                            </div>
                                        </div >
                                    </div>

                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ActorDetails

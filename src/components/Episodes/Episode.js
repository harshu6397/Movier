import './Episode.css'
import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';


const Episode = () => {
    const param = useParams();
    const [seasonData, setSeasonData] = React.useState([]);
    const [episodes, setEpisodes] = React.useState([]);

    // Variables for API
    const baseUrl = "https://api.themoviedb.org/3";
    const apiKey = process.env.REACT_APP_TMDB_API_KEY;
    const language = "en-US";

    // Get Episode Details
    const getEpisodes = async () => {
        const response = await axios.get(`${baseUrl}/tv/${param.tv_id}/season/${param.id}?api_key=${apiKey}&language=${language}`);
        setEpisodes(response.data.episodes);
        console.log(response.data);

        setSeasonData(response.data);
    }

    useEffect(() => {
        getEpisodes();
        //eslint-disable-next-line
    }, [])

    // Get Formatted Date
    const getFormatedDate = (date) => {
        const months = {
            1: 'January',
            2: 'February',
            3: 'March',
            4: 'April',
            5: 'May',
            6: 'June',
            7: 'July',
            8: 'August',
            9: 'September',
            10: 'October',
            11: 'November',
            12: 'December'
        }
        const d = new Date(date);
        const year = d.getFullYear();
        const month = d.getMonth() + 1;
        const day = d.getDate();
        return `${day} ${months[month]} ${year}`
    }

    return (
        <div>
            <div className="flex justify-start flex-col items-center w-full">
                <Navbar />
                <div className="flex flex-wrap justify-center w-[90%] m-auto text-center">
                    <div className="movie-details-overview-content w-[95%] h-full m-auto pt-4 mt-[40px] border-b-2 border-t-2 border-black border-opacity-20 pb-[1rem]">
                        <div className="movie-details-overview-content-wrapper flex flex-col text-start">
                            <div className="upper flex flex-col items-center md:flex-row lg:flex-row">
                                <div className={`left movie-details-overview-content-wrapper-image text-2xl text-white md:pr-[5rem] lg:pr-[5rem] ${seasonData?.poster_path === null ? "h-[15.5rem]" : ""}`}>
                                    <div className="img-contrainer w-[20rem]">
                                        <img className='w-full h-full' src={"https://image.tmdb.org/t/p/w780" + seasonData?.poster_path} alt="" />
                                    </div>
                                </div>
                                <div className='right'>
                                    <div className="movie-details-overview-content-wrapper-title text-4xl text-white mb-4 text-center md:text-start pt-4">
                                        {seasonData?.name}
                                    </div>
                                    <div className="movie-details-overview-content-wrapper-description text-lg text-white mb-4 md:text-start text-justify">
                                        {seasonData?.overview}
                                    </div>
                                    <div className="info">
                                        <div className="info-item flex gap-2 text-lg mb-2">
                                            <div className="info-item-title text-white text-opacity-50 w-[50%] md:w-[50%]">
                                                Release Date
                                            </div>
                                            <div className="info-item-value text-white w-[50%] md:w-[50%]">
                                                {getFormatedDate(seasonData?.air_date)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="info">
                                        <div className="info-item flex gap-2 text-lg mb-2">
                                            <div className="info-item-title text-white text-opacity-50 w-[50%] md:w-[50%]">
                                                Number of Episodes
                                            </div>
                                            <div className="info-item-value text-white w-[50%] md:w-[50%]">
                                                {seasonData?.episodes?.length}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="info">
                                        <div className="info-item flex gap-2 text-lg mb-2">
                                            <div className="info-item-title text-white text-opacity-50 w-[50%] md:w-[50%]">
                                                Rating
                                            </div>
                                            <div className="info-item-value text-white w-[50%] md:w-[50%]">
                                                {seasonData?.episodes?.[0]?.vote_average?.toFixed(1)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lower movies-credits-card mt-12">
                        <div className="section-header text-white new-sd">
                            <h1 className="text-5xl leading-tight mt-0 mb-2 font-bold text-cyan-400 uppercase">
                                Episodes
                            </h1>
                        </div>
                        <div className='grid-cont mt-8 m-auto grid grid-cols-1 md:gap-6 md:grid-cols-2 lg:grid-cols-3'>
                            {
                                episodes?.map((item, index) => {
                                    return <div
                                        className={`Carousel episode-item w-full 2xl:w-[22rem] xl:w-[21rem] lg:w-[17rem] md:w-[19.5rem] ml-2 mr-2 my-3 movies-slide carousel-nav-center owl-carousel ${seasonData?.poster_path === null ? "h-[15rem]" : ""}`}
                                        key={index}
                                        style={{ width: "100%" }}
                                    >
                                        <div className= {`rounded-md relative ${seasonData?.poster_path === null ? "h-[15rem] w-[20rem]" : ""}`}>
                                            <img className='rounded-md' loading="lazy" style={{ width: "100%", height: "100%" }} src={"https://image.tmdb.org/t/p/w342" + item?.still_path} alt="" />
                                            <div className="blur-div backdrop-blur-sm w-full h-full center opacity-0 transition duration-1000 pt-4 overflow-y-scroll">
                                                {item?.overview}
                                            </div>
                                            <div className="movie-item-content justify-center">
                                                <div className="movie-item-title">
                                                    {item?.name}
                                                </div>
                                                <div className="movie-infos justify-center">
                                                    <div className="movie-info">
                                                        <i className="bx bxs-star"></i>
                                                        <span>{item?.vote_average}</span>
                                                    </div>
                                                    <div className="movie-info">
                                                        <i className="bx bx-calendar"></i>
                                                        <span>{new Date(item?.air_date).getFullYear()}</span>
                                                    </div>
                                                    <div className="movie-info">
                                                        <i className="bx bx-time"></i>
                                                        <span>{item?.runtime} mins</span>
                                                    </div>
                                                    <div className="movie-info">
                                                        <i className="bx bx-like"></i>
                                                        <span>{item?.vote_count}</span>
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
                <Footer />
            </div>
        </div>
    )
}

export default Episode

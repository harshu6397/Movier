import './SeriesDetails.css'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import ReactElasticCarousel from "react-elastic-carousel";

const SeriesDetails = () => {
    const params = useParams()
    const [detail, setDeatils] = useState([]);
    const [isOverview, setIsOverview] = useState(true);
    const [isVideos, setIsVideos] = useState(false);
    const [isPictures, setIsPictures] = useState(false);
    const [isSeasons, setIsSeasons] = useState(false);
    const [credits, setCredits] = useState([]);
    const [videoInfo, setVideoInfo] = useState([]);
    const [videoUrls, setVideoUrls] = useState({});
    const [imageUrls, setImageUrls] = useState({});
    const [photos, setPhotos] = useState([]);
    const [recommandedMovies, setRecommandedMovies] = useState([]);
    const [trailer, setTrailer] = useState({});

    const getDetails = async (videoId) => {
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${videoId}?api_key=2beb22c118b4fce0394ce433a0c50f94&language=en-US`);
        setDeatils(response.data)
    }

    const getMovieCredits = async (videoId) => {
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${videoId}/credits?api_key=2beb22c118b4fce0394ce433a0c50f94&language=en-US`);
        console.log(response.data);
        setCredits(response.data)
    }

    const getVideosAndImageUrl = async (videoId) => {
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${videoId}/videos?api_key=2beb22c118b4fce0394ce433a0c50f94&language=en-US`)
        setVideoInfo(response.data.results)

        const videoBaseUrl = 'https://www.youtube.com/embed/';
        const videoAutoplay = '?rel=0;&autoplay=1&mute=0';
        const imageBaseUrl = "https://img.youtube.com/vi/";
        const imageUrlEndPart = "mqdefault.jpg";

        const trailerObj = {}
        trailerObj[videoId] = videoBaseUrl + response.data.results[0].key + videoAutoplay;
        setTrailer(prev => ({ ...prev, ...trailerObj }));

        let fullVideoUrls = {}
        response.data.results.forEach((video) => {
            fullVideoUrls[video.key] = videoBaseUrl + video.key + videoAutoplay
        })

        let fullImageUrls = {}
        response.data.results.forEach((video) => {
            fullImageUrls[video.key] = imageBaseUrl + video.key + "/" + imageUrlEndPart
        })
        setVideoUrls(fullVideoUrls)
        setImageUrls(fullImageUrls)
    }

    const getPhotos = async (videoId) => {
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${videoId}/images?api_key=2beb22c118b4fce0394ce433a0c50f94`)
        setPhotos(response.data.backdrops)
    }

    const getRecommendedMovies = async (videoId) => {
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${videoId}/recommendations?api_key=2beb22c118b4fce0394ce433a0c50f94&language=en-US&page=1`)
        setRecommandedMovies(response.data.results)
    }

    useEffect(() => {
        getDetails(params.id)
        getMovieCredits(params.id)
        getVideosAndImageUrl(params.id)
        getPhotos(params.id)
        getRecommendedMovies(params.id)
    }, [params.id])

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

    const handleClick = (e) => {
        if (e.target.id === 'overview') {
            setIsOverview(true);
            setIsVideos(false);
            setIsPictures(false);
            setIsSeasons(false);
        }
        if (e.target.id === 'videos') {
            setIsOverview(false);
            setIsVideos(true);
            setIsPictures(false);
            setIsSeasons(false);
        }
        if (e.target.id === 'pictures') {
            setIsOverview(false);
            setIsVideos(false);
            setIsPictures(true);
            setIsSeasons(false);

        }
        if (e.target.id === 'seasons') {
            setIsOverview(false);
            setIsVideos(false);
            setIsPictures(false);
            setIsSeasons(true);
        }
    }

    return (
        <div className='deatils-conatiner'>
            <Navbar />
            <div className="hero-section h-[37rem]">
                <div className="hero-slide h-[37rem]">
                    <div className="owl-carousel carousel-nav-center h-[37rem]" id="hero-carousel">
                        <div className="hero-slide-item h-[37rem]">
                            <img src={"https://image.tmdb.org/t/p/original" + detail?.backdrop_path} alt="" />
                            <div className="overlay"></div>
                            <div className="hero-slide-item-content">
                                <div className="item-content-wraper">
                                    <div className="item-content-title top-down mt-[6rem]">
                                        {detail?.name}
                                    </div>
                                    <div className="movie-infos top-down delay-2">
                                        <div className="movie-info">
                                            <i className="bx bxs-star"></i>
                                            <span>{detail?.vote_average}</span>
                                        </div>
                                        <div className="movie-info">
                                            <i className="bx bxs-calendar"></i>
                                            <span>{detail?.first_air_date}</span>
                                        </div>
                                        <div className="movie-info">
                                            <i className="bx bxs-comment-detail"></i>
                                            <span>{detail?.vote_count} Reviews</span>
                                        </div>
                                        <div className="movie-info">
                                            <i className="bx bxs-right-arrow"></i>
                                            <span>HD</span>
                                        </div>
                                    </div>
                                    <div className="item-content-description top-down delay-4">
                                        {detail?.overview}
                                    </div>
                                    <div className="item-action top-down delay-6">
                                        <a href={`${trailer[params.id]}`} target="_blank" rel='noreferrer' className="btn btn-hover">
                                            <i className="bx bxs-right-arrow"></i>
                                            <span>Watch Trailer</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="movie-details w-[95%] h-full m-auto pt-4">
                <div className="movie-details-header-label flex pt-8 justify-center gap-4 text-2xl text-gray-500 uppercase border-b-2 border-black border-opacity-20">
                    <div onClick={handleClick} className={`h-[40px] pl-[24px] pr-[24px] hover:text-white ${isOverview ? "border-b-[3px] text-white cursor-pointer click-effect" : "text-white text-opacity-25 cursor-pointer"}`}>
                        <span id="overview">overview</span>
                    </div>
                    <div onClick={handleClick} className={`h-[40px] pl-[24px] pr-[24px] hover:text-white ${isVideos ? "border-b-[3px] text-white cursor-pointer click-effect" : "text-white text-opacity-25 cursor-pointer"}`}>
                        <span id="videos">videos</span>
                    </div>
                    <div onClick={handleClick} className={`h-[40px] pl-[24px] pr-[24px] hover:text-white ${isPictures ? "border-b-[3px] text-white cursor-pointer click-effect" : "text-white text-opacity-25 cursor-pointer"}`}>
                        <span id='pictures'>pictures</span>
                    </div>
                    <div onClick={handleClick} className={`h-[40px] pl-[24px] pr-[24px] hover:text-white ${isSeasons ? "border-b-[3px] text-white cursor-pointer click-effect" : "text-white text-opacity-25 cursor-pointer"}`}>
                        <span id='seasons'>seasons</span>
                    </div>
                </div>
            </div>
            {
                isOverview && <div className="movie-details-overview-content w-[95%] h-full m-auto pt-4 mt-[40px] mb-[40px] border-b-2 border-black border-opacity-20">
                    <div className="movie-details-overview-content-wrapper flex flex-col">
                        <div className="upper flex">
                            <div className="left movie-details-overview-content-wrapper-image text-2xl text-white pr-[5rem] ">
                                <div className="img-contrainer w-[20rem]">
                                <img className='w-full h-full' src={"https://image.tmdb.org/t/p/original" + detail?.poster_path} alt="" />
                                </div>
                            </div>
                            <div className='right'>
                                <div className="movie-details-overview-content-wrapper-title text-4xl text-white mb-4">
                                    {detail?.name}
                                </div>
                                <div className="movie-details-overview-content-wrapper-description text-lg text-white mb-12">
                                    {detail?.overview}
                                </div>
                                <div className="info">
                                    <div className="info-item flex gap-2 text-lg mb-2">
                                        <div className="info-item-title text-white text-opacity-50 w-[30%]">
                                            Release Date
                                        </div>
                                        <div className="info-item-value text-white w-[70%]">
                                            {getFormatedDate(detail?.first_air_date)}
                                        </div>
                                    </div>
                                    <div className="info-item flex gap-2 text-lg mb-2">
                                        <div className="info-item-title text-white text-opacity-50 w-[30%]">
                                            Number of Seasons
                                        </div>
                                        <div className="info-item-value text-white w-[70%]">
                                            {detail?.number_of_seasons}
                                        </div>
                                    </div>
                                    <div className="info-item flex gap-2 text-lg mb-2">
                                        <div className="info-item-title text-white text-opacity-50 w-[30%]">
                                            Number of Episodes
                                        </div>
                                        <div className="info-item-value text-white w-[70%]">
                                            {detail?.number_of_episodes}
                                        </div>
                                    </div>
                                    <div className="info-item flex gap-2 text-lg mb-2">
                                        <div className="info-item-title text-white text-opacity-50 w-[30%]">
                                            Status
                                        </div>
                                        <div className="info-item-value text-white w-[70%]">
                                            {detail?.status}
                                        </div>
                                    </div>
                                    <div className="info-item flex gap-2 text-lg mb-2">
                                        <div className="info-item-title text-white text-opacity-50 w-[30%]">
                                            Genres
                                        </div>
                                        <div className="info-item-value text-white w-[70%]">
                                            {detail?.genres?.map((genre, index) => {
                                                return <span className="text-cyan-500 rounded-lg border-cyan-400 w-2" key={index}>
                                                    {
                                                        index === detail?.genres.length - 1 ? genre.name : genre.name + ', '
                                                    }
                                                </span>
                                            })}
                                        </div>
                                    </div>

                                    <div className="info-item flex gap-2 text-lg mb-2">
                                        <div className="info-item-title text-white text-opacity-50 w-[30%]">
                                            Languages
                                        </div>
                                        <div className="info-item-value text-white w-[70%]">
                                            {detail?.spoken_languages?.map((language, index) => {
                                                return <span className="text-cyan-500" key={index}>
                                                    {
                                                        index === detail?.spoken_languages.length - 1 ? language.english_name : language.english_name + ', '
                                                    }
                                                </span>
                                            })}
                                        </div>
                                    </div>
                                    <div className="info-item flex gap-2 text-lg mb-2">
                                        <div className="info-item-title text-white text-opacity-50 w-[30%]">
                                            Production Companies
                                        </div>
                                        <div className="info-item-value text-white w-[70%]">
                                            {detail?.production_companies?.map((company, index) => {
                                                return <span className="text-cyan-500" key={index}>
                                                    {
                                                        index === detail?.production_companies.length - 1 ? company.name : company.name + ', '
                                                    }

                                                </span>
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lower cast">
                            <div className="section-header text-white mt-12 mb-4">
                                cast
                            </div>
                            <div className="cast-list flex gap-4">
                                <ReactElasticCarousel
                                    itemsToShow={5}
                                    breakPoints={[
                                        { width: 1, itemsToShow: 1 },
                                        { width: 550, itemsToShow: 2 },
                                        { width: 768, itemsToShow: 4 },
                                        { width: 1200, itemsToShow: 5 },
                                        { width: 1500, itemsToShow: 6 },
                                    ]}
                                    itemsToScroll={1}
                                    // renderArrow={myArrow}
                                    easing="cubic-bezier(0.455, 0.03, 0.515, 0.955)"
                                    renderPagination={({ pages, activePage, onClick }) => {
                                        return (
                                            <div className="owl-dots">
                                                {pages.map(page => {
                                                    const isActivePage = activePage === page;
                                                    return (
                                                        <button
                                                            key={page}
                                                            onClick={() => onClick(page)}
                                                            className={`owl-dot ${isActivePage ? 'active' : ''}`}
                                                        />
                                                    );
                                                })}
                                            </div>
                                        );
                                    }}
                                >
                                    {
                                        credits?.cast?.map((item, index) => {
                                            return <div
                                                className="Carousel w-[19.5rem] ml-2 mr-2 movies-slide carousel-nav-center owl-carousel" key={index}
                                                onMouseEnter={() => {
                                                    let playBtn = document.querySelector(`.play-btn-${index}`);
                                                    playBtn.style.display = "block";
                                                    playBtn.style.transition = "all .5s ease-in-out";

                                                }}
                                                onMouseLeave={() => {
                                                    let playBtn = document.querySelector(`.play-btn-${index}`);
                                                    playBtn.style.display = "none";
                                                    playBtn.style.transition = "all .5s ease-in-out";
                                                }}
                                            >
                                                <Link to={`/actor-details/${item.id}`} className={`play-btn-${index} c-btn p-btn hidden px-12 py-2.5 bg-cyan-400 text-black font-bold text-xs leading-tight uppercase rounded shadow-md relative z-10 transition duration-500 ease-in-out`}>Know More</Link>
                                                <div className="movie-item rounded-md">
                                                    <img loading="lazy" src={"https://image.tmdb.org/t/p/w342" + item.profile_path} alt="" />
                                                    <div className="movie-item-content">
                                                        <div className="movie-item-title text-center">
                                                            {item.name}
                                                        </div>
                                                    </div>
                                                </div >
                                            </div>

                                        })
                                    }
                                </ReactElasticCarousel>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                isVideos && <div className="videos-container flex gap-10 flex-wrap w-[95%] m-auto mt-12 justify-center border-b-2 border-black border-opacity-20 pb-[2rem]">
                    {
                        videoInfo?.map((video) => {
                            return <div className="video w-[400px] h-[300px]" key={video.key}>
                                <div className="rounded-md w-[400px] bg-white h-[250px] relative">
                                    <a href={`${videoUrls[video.key]}`} target="_blank" rel='noreferrer' className='play-btn z-10'>
                                        <svg _ngcontent-nml-c5="" height="48" viewBox="0 0 55 55" width="48" xmlns="http://www.w3.org/2000/svg"><circle _ngcontent-nml-c5="" cx="27.5" cy="27.5" fill="none" r="26.75" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></circle><path _ngcontent-nml-c5="" d="M20.97 40.81L40.64 27.5 20.97 14.19v26.62z" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path></svg>
                                    </a>
                                    <img loading="lazy" className='w-full h-full object-fill' src={imageUrls[video.key]} alt="" />
                                    <div className="name text-white mt-1">
                                        {video.name}
                                    </div>
                                    <div className="type text-white mt-1">
                                        {video.type}
                                    </div>
                                </div >
                            </div>
                        })
                    }
                </div>
            }
            {
                isPictures && <div className="pictures-container flex gap-4 flex-wrap w-[95%] m-auto mt-12 justify-center border-b-2 border-black border-opacity-20 pb-[2rem]">
                    {
                        photos?.map((photo) => {
                            return <div className="picture w-[300px] h-[200px]" key={photo.file_path}>
                                <div className="rounded-md w-[300px] bg-white h-[200px] relative">
                                    <img loading="lazy" className='w-full h-full object-fill border border-black hover:border-white' src={"https://image.tmdb.org/t/p/w342" + photo.file_path} alt="" />
                                </div >
                            </div>
                        })
                    }
                </div>
            }
            {
                isSeasons && <div className="seasons-container flex gap flex-wrap w-[95%] m-auto mt-12 justify-center">
                    {
                        detail?.seasons?.map((season) => {
                            return <div class="sm:max-w-lg sm:mx-auto md:mx-[1rem]" key={season.season_number}>
                                    <div class=" shadow-lg border sm:rounded-3xl p-2 mb-12 flex space-x-10">
                                        <div class=" overflow-visible w-1/2">
                                            <Link to={`/${params.id}/episodes/${season.season_number}`}><img class="rounded-3xl shadow-lg" src={"https://image.tmdb.org/t/p/w780" + detail?.poster_path} alt="" /></Link>
                                        </div>
                                        <div class="flex flex-col w-1/2 space-y-4 pt-6">
                                            <div class="flex justify-between items-start">
                                            <Link to={`/${params.id}/episodes/${season.season_number}`}><h2 class="text-3xl text-white font-bold">{season.name}</h2>
                                            </Link>
                                            </div>
                                            <div>
                                                <div class="text-sm text-gray-200">Series</div>
                                                <div class="text-lg text-gray-200">{season.air_date}</div>
                                            </div>
                                            <p class=" text-gray-200 max-h-40 overflow-y-hidden">{season.overview}</p>
                                            <div className="number-of-episodes">
                                                <span className="text-gray-200">Number of episodes:</span>
                                                <span className="text-gray-200">&nbsp;{season.episode_count}</span>
                                            </div>
                                        </div>
                                </div>

                            </div>
                        }
                        )
                    }
                </div>
            }
            <div className="recommanded-video w-[95%] m-auto">
                <div className="section-header text-white mt-12 mb-4">
                    <h2 className="text-2xl font-bold">Recommanded Series/TV Shows</h2>
                </div>
                <div className="cast-list flex gap-4">
                    <ReactElasticCarousel
                        itemsToShow={5}
                        breakPoints={[
                            { width: 1, itemsToShow: 1 },
                            { width: 550, itemsToShow: 2 },
                            { width: 768, itemsToShow: 4 },
                            { width: 1200, itemsToShow: 5 },
                            { width: 1500, itemsToShow: 6 },
                        ]}
                        itemsToScroll={1}
                        // renderArrow={myArrow}
                        easing="cubic-bezier(0.455, 0.03, 0.515, 0.955)"
                        renderPagination={({ pages, activePage, onClick }) => {
                            return (
                                <div className="owl-dots">
                                    {pages.map(page => {
                                        const isActivePage = activePage === page;
                                        return (
                                            <button
                                                key={page}
                                                onClick={() => onClick(page)}
                                                className={`owl-dot ${isActivePage ? 'active' : ''}`}
                                            />
                                        );
                                    })}
                                </div>
                            );
                        }}
                    >
                        {
                            recommandedMovies?.map((item, index) => {
                                return <div
                                    className="Carousel w-[19.5rem] ml-2 mr-2 movies-slide carousel-nav-center owl-carousel" key={index}
                                    onMouseEnter={() => {
                                        let playBtn = document.querySelector(`.play-btn-r-${index}`);
                                        playBtn.style.display = "block";
                                        playBtn.style.transition = "all .5s ease-in-out";

                                    }}
                                    onMouseLeave={() => {
                                        let playBtn = document.querySelector(`.play-btn-r-${index}`);
                                        playBtn.style.display = "none";
                                        playBtn.style.transition = "all .5s ease-in-out";
                                    }}
                                >
                                    <Link to={`/series-details/${item.id}}`} className={`play-btn-r-${index} c-btn p-btn hidden px-12 py-2.5 bg-cyan-400 text-black font-bold text-xs leading-tight uppercase rounded shadow-md relative z-10 transition duration-500 ease-in-out`}>Know More</Link>
                                    <div className="movie-item rounded-md">
                                        <img loading="lazy" src={"https://image.tmdb.org/t/p/w342" + item.poster_path} alt="" />
                                        <div className="movie-item-content">
                                            <div className="movie-item-title text-center">
                                                {item.name}
                                            </div>
                                            <div className="movie-infos flex justify-center">
                                                <div className="movie-info">
                                                    <i className="bx bxs-star"></i>
                                                    <span>{item.vote_average}</span>
                                                </div>
                                                <div className="movie-info">
                                                    <i className="bx bxs-calendar"></i>
                                                    <span>{item.first_air_date}</span>
                                                </div>
                                                <div className="movie-info">
                                                    <i className="bx bxs-comment-detail"></i>
                                                    <span>{item.vote_count}</span>
                                                </div>
                                                <div className="movie-info">
                                                    <i className="bx bxs-right-arrow"></i>
                                                    <span>HD</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div >
                                </div>

                            })
                        }
                    </ReactElasticCarousel>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SeriesDetails

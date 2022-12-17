import './Movies.css';
import axios from 'axios';
import loader from '../../images/spinner.svg'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'

const Movies = ({ items, itemName, page, getMovies, loading, searchTerm, setSearchTerm }) => {
    const [genresList, setGenresList] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    // Variables for API
    const baseUrl = "https://api.themoviedb.org/3";
    const apiKey = process.env.REACT_APP_TMDB_API_KEY;
    const language = "en-US";

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
        if (event.target.value === '') {
            getMovies(page);
            setIsSearching(false);
        }
    };

    const handleClick = () => {
        setIsSearching(true);
        if (searchTerm !== '') {
            getMovies(page, searchTerm.toLowerCase());
        }
    }

    const handleScroll = () => {
        if (
            window.innerHeight + window.scrollY >= document.body.offsetHeight - 2
        ) {
            page = page + 1;
            getMovies(page);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        //eslint-disable-next-line
    }, [])

    // Get genres list
    const getGenresList = async () => {
        const response = await axios.get(`${baseUrl}/genre/movie/list?api_key=${apiKey}&language=${language}`);
        // setGenresList(response.data.genres);
        const geṇres = {}
        response.data.genres.forEach(item => {
            geṇres[item.id] = item.name
        })
        setGenresList(geṇres);
    }

    useEffect(() => {
        getGenresList();
    }, [])


    return (
        <div className="movies-container flex justify-start flex-col items-center w-full">
            <Navbar />
            <div className="itemName w-[95%] flex justify-between items-center">
                <div>
                    <div className="section-header text-white new-sd">
                        <h1 className="text-5xl leading-tight mt-0 mb-2 font-bold text-cyan-400 uppercase">{itemName}</h1>
                    </div>

                </div>
                <div className="searchBox lg:flex">
                    <input type="text" onChange={handleChange} placeholder={`Search for ${itemName}...`} className="searchInput hidden md:hidden lg:pl-[1rem] lg:block" />
                    <button onClick={handleClick} className="searchBtn bg-cyan-400 border-cyan-400 cursor-pointer hidden md:hidden lg:block lg:w-[30rem]">
                        <i className="bx bx-search"></i>
                    </button>
                </div>
            </div>
            {
                isSearching && items?.length !== 0 && <p className="text-2xl leading-tight mt-0 mb-4 font-bold text-white uppercase">Total Search Result : {items?.length}</p>
            }

            <div className="items-container w-full text-center justify-center"
            >
                {
                    items?.map((item, index) => {
                        return <div
                            className="Carousel w-full sm:w-[12rem] md:w-[15.5rem] lg:w-[14.5rem] xl:w-[16rem] md:ml-2 md:mr-2 md:my-3 movies-slide carousel-nav-center owl-carousel"
                            key={index}
                            onMouseEnter={() => {
                                document.querySelector(`.play-btn-${index}`).style.display = "block";
                            }}
                            onMouseLeave={() => {
                                document.querySelector(`.play-btn-${index}`).style.display = "none";
                            }}
                        >
                            <Link to={`/movie-details/${item?.id}`} className={`play-btn-${index} p-btn hidden px-6 py-2.5 bg-cyan-400 text-black font-bold text-xs leading-tight uppercase rounded shadow-md relative z-10 transition duration-150 ease-in-out`}>Play Now</Link>
                            <div className="genres-pill py-1 px-3 rounded-full text-sm bg-cyan-400 hover:bg-cyan-600 text-black text-opacity-80 hover:text-white hover:drop-shadow-md duration-300 absolute z-30">
                                <span className=" text-xs font-bold">{genresList[item?.genre_ids[0]] === undefined ? genresList[item?.genre_ids[1]] === undefined ? "Drama" : genresList[item?.genre_ids[1]] : genresList[item?.genre_ids[0]]}</span>
                            </div>
                            <div className="movie-item rounded-md">
                                <img loading="lazy" src={"https://image.tmdb.org/t/p/w342" + item?.poster_path} alt="" />
                                <div className="movie-item-content justify-center">
                                    <div className="movie-item-title">
                                        {itemName === "movies" ? item?.title : item?.name}
                                    </div>
                                    <div className="movie-infos justify-center">
                                        <div className="movie-info">
                                            <i className="bx bxs-star"></i>
                                            <span>{item?.vote_average}</span>
                                        </div>
                                        <div className="movie-info">
                                            <i className="bx bx-calendar"></i>
                                            <span>{item?.release_date}</span>
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
            </div>
            {
                searchTerm !== "" ? <img className={`${loading ? "loader" : ""}`} src={loader} alt="" /> :
                    loading && <img src={loader} alt="" />
            }
            <Footer />
        </div>
    )
}

export default Movies

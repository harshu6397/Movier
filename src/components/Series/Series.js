import './Series.css'
import React, { useEffect } from 'react'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import { Link } from 'react-router-dom';
import loader from '../../images/spinner.svg'

const Series = ({ items, itemName, page, getSeries, loading, searchTerm, setSearchTerm }) => {
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
        if (event.target.value === '') {
            getSeries(page);
        }
    };

    const handleClick = () => {
        if (searchTerm !== '') {
            getSeries(page, searchTerm);
        }
    }

    const handleScroll = () => {
        if (
            window.innerHeight + window.scrollY >= document.body.offsetHeight - 2
        ) {
            page = page + 1;
            getSeries(page);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        //eslint-disable-next-line
    }, [])

    return (
        <div className="flex justify-start flex-col items-center w-full">
            <Navbar />
            <div className="itemName w-[90%] flex justify-between items-center">
            <div className="section-header text-white new-sd">
                <h1 className="text-5xl leading-tight mt-0 mb-2 font-bold text-cyan-400 uppercase">{itemName}</h1>
                </div>
                <div className="searchBox lg:flex">
                    <input type="text" onChange={handleChange} placeholder={`Search for ${itemName}...`} className="searchInput hidden md:hidden lg:pl-[1rem] lg:block" />
                    <button onClick={handleClick}  className="searchBtn bg-cyan-400 border-cyan-400 cursor-pointer hidden md:hidden lg:block lg:w-[30rem]">
                        <i className="bx bx-search"></i>
                    </button>
                </div>
            </div>
            <div className="items-container w-full text-center"style={{height : `${loading ? "50vh" : ""}`}}>
                {
                    items.map((item, index) => {
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
                            <Link to={`/series-details/${item.id}`} className={`play-btn-${index} p-btn hidden px-6 py-2.5 bg-cyan-400 text-black font-bold text-xs leading-tight uppercase rounded shadow-md relative z-10 transition duration-150 ease-in-out`}>Play Now</Link>
                            <div className="movie-item rounded-md">
                                <img loading="lazy" src={"https://image.tmdb.org/t/p/w342" + item.poster_path} alt="" />
                                <div className="movie-item-content justify-center">
                                    <div className="movie-item-title">
                                        {itemName === "movies" ? item.title : item.name}
                                    </div>
                                    <div className="movie-infos justify-center">
                                        <div className="movie-info">
                                            <i className="bx bxs-star"></i>
                                            <span>{item.vote_average}</span>
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
            </div>
            {
                // loading && <h1 className="text-3xl text-cyan-400">Loading...</h1>
                loading ? <img className={`${loading ? "loader" : ""}`} src={loader} alt="" /> :
                    <img src={loader} alt="" />
            }
            <Footer />
        </div>
    )
}

export default Series

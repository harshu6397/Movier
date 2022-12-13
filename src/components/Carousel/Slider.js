import "./slider.css";
import React, { useEffect } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import axios from "axios";

function Slider({ sliderImage }) {
    const [trailer, setTrailer] = React.useState({});

    const getTrailer = async (id) => {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=2beb22c118b4fce0394ce433a0c50f94&language=en-US`);
        const trailerObj = {}
        const videoBaseUrl = 'https://www.youtube.com/embed/';
        const videoAutoplay = '?rel=0;&autoplay=1&mute=0';
        trailerObj[id] = videoBaseUrl + response.data.results[0].key + videoAutoplay;
        setTrailer(prev => ({ ...prev, ...trailerObj }));
    }

    useEffect(() => {
        sliderImage.forEach(item => {
            getTrailer(item.id);
        })
    }, [sliderImage])

    const arrowStyles = {
        position: 'absolute',
        zIndex: 2,
        top: 'calc(50% - 15px)',
        width: 30,
        height: 30,
        fontSize: '2.5rem',
        cursor: 'pointer',
        color: 'white',
    };

    return (
        <div className="slider-container">
            <div className="hero-section">
                <Carousel
                    showThumbs={false}
                    showStatus={false}
                    autoPlay={true}
                    infiniteLoop={true}
                    interval={4000}
                    transitionTime={250}
                    stopOnHover={false}
                    emulateTouch={true}
                    showIndicators={false}
                    useKeyboardArrows
                    swipeable={true}
                    renderArrowPrev={(onClickHandler, hasPrev, label) =>
                        hasPrev && (
                            <button className="owl-btn" type="button" onClick={onClickHandler} title={label} style={{ ...arrowStyles, left: 15 }}>
                                <i className='bx bx-chevron-left'></i>
                            </button>
                        )
                    }
                    renderArrowNext={(onClickHandler, hasNext, label) =>
                        hasNext && (
                            <button className="owl-btn" type="button" onClick={onClickHandler} title={label} style={{ ...arrowStyles, right: 15 }}>
                                <i className="bx bx-chevron-right"></i>
                            </button>
                        )
                    }
                >
                    {sliderImage.map((item, index) => {
                        return <div className="hero-slide" key={index}>
                            <div className="owl-carousel carousel-nav-center" id="hero-carousel">
                                <div className="hero-slide-item">
                                    <img src={"https://image.tmdb.org/t/p/original" + item.backdrop_path} alt="" />
                                    <div className="overlay"></div>
                                    <div className="hero-slide-item-content">
                                        <div className="item-content-wraper">
                                            <div className="item-content-title top-down">
                                                {item.title}
                                            </div>
                                            <div className="movie-infos top-down delay-2">
                                                <div className="movie-info">
                                                    <i className="bx bxs-star"></i>
                                                    <span>{item.vote_average} | </span>
                                                </div>
                                                <div className="movie-info">
                                                    <i className="bx bxs-calendar"></i>
                                                    <span>{item.release_date} | </span>
                                                </div>
                                                <div className="movie-info">
                                                    <i className="bx bxs-comment-detail"></i>
                                                    <span>{item.vote_count} Reviews |</span>
                                                </div>
                                                <div className="movie-info">
                                                    <i className="bx bxs-right-arrow"></i>
                                                    <span>HD</span>
                                                </div>
                                            </div>
                                            <div className="item-content-description top-down delay-4">
                                                {item.overview}
                                            </div>
                                            <div className="item-action top-down delay-6">
                                                <a href={`${trailer[item.id]}}`} target="_blank" rel="noreferrer" className="btn btn-hover">
                                                    <i className="bx bxs-right-arrow"></i>
                                                    <span>Watch Trailer</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}
                </Carousel>
            </div>
        </div >

    );
}

export default Slider;

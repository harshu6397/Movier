import ReactElasticCarousel from "react-elastic-carousel";
import { Link } from "react-router-dom";

const MainSlider = ({ itemName, items }) => {
    return (
        <div className={`section ${itemName}`}>
            <div className="container">
                <div className="flex justify-between">
                    <div className="section-header text-white">
                        {itemName}
                    </div>
                    <div>
                        <Link to={`/${itemName.split(" ").includes("tv") ? 'tv-shows' : itemName.split(" ").includes("movies") ? "movies" : "series"}`} className="text-white hover:text-cyan-400 text-xl">Explore All</Link>
                    </div>
                </div>
                <ReactElasticCarousel
                    itemsToShow={5}
                    breakPoints={[
                        { width: 1, itemsToShow: 1 },
                        { width: 350, itemsToShow: 2 },
                        { width:500, itemsToShow : 3 },
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
                        items?.map((item, index) => {
                            return <div
                                className="Carousel w-[19.5rem] ml-2 mr-2 movies-slide carousel-nav-center owl-carousel" key={index}
                                onMouseEnter={() => {
                                    let playBtn = document.querySelector(`.play-btn-${itemName.split(" ").includes('tv') ? "tv" : itemName.split(" ").includes('movies') ? itemName.split(" ")[0].slice(0, 1) : 's'}-${index}`);
                                    playBtn.style.display = "block";
                                    playBtn.style.transition = "all .5s ease-in-out";

                                }}
                                onMouseLeave={() => {
                                    let playBtn = document.querySelector(`.play-btn-${itemName.split(" ").includes('tv') ? "tv" : itemName.split(" ").includes('movies') ? itemName.split(" ")[0].slice(0, 1) : 's'}-${index}`);
                                    playBtn.style.display = "none";
                                    playBtn.style.transition = "all .5s ease-in-out";
                                }}
                            >
                                <Link
                                    to={
                                        itemName.split(" ").includes("movies") ? `/movie-details/${item.id}` : `/series-details/${item.id}`
                                    }
                                    className={
                                        `play-btn-${itemName.split(" ").includes('tv') ? "tv" : itemName.split(" ").includes('movies') ? itemName.split(" ")[0].slice(0, 1) : 's'}-${index} p-btn hidden px-6 py-2.5 bg-cyan-400 text-black font-bold text-xs leading-tight uppercase rounded shadow-md relative z-10 transition duration-500 ease-in-out`
                                    }
                                >
                                    Play Now</Link>
                                <div className="movie-item rounded-md">
                                    <img loading="lazy" src={"https://image.tmdb.org/t/p/w342" + item.poster_path} alt="" />
                                    <div className="movie-item-content">
                                        <div className="movie-item-title text-center">
                                            {itemName.split(" ").includes("movies") ? item.title : item.name}
                                        </div>
                                        <div className="movie-infos flex justify-center">
                                            <div className="movie-info">
                                                <i className="bx bxs-star"></i>
                                                <span>9.5</span>
                                            </div>
                                            <div className="movie-info">
                                                <i className="bx bxs-time"></i>
                                                <span>120 mins</span>
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

    )
}

export default MainSlider

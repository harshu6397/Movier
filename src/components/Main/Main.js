import React, {useState, useEffect} from 'react'
import Slider from '../Carousel/Slider'
import MainSlider from '../MainSlider/MainSlider'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import axios from 'axios'

const Main = () => {
    const [sliderImage, setSliderImage] = useState([]); 
    const [series, setSeries] = useState([])
    const [tvShows, setTvShows] = useState([])
    const [latestMovies, setLatestMovies] = useState([])
    // const [topRatedMovies, setTopRatedMovies] = useState([])
    // const [upComingMovies, setUpComingMovies] = useState([])

    const getSliderImage = async () => {
        const response = await axios.get("https://api.themoviedb.org/3/movie/now_playing?api_key=2beb22c118b4fce0394ce433a0c50f94");  
        setSliderImage(response.data.results);
    }

    const getLatestMovies = async () => {
      const response = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=2beb22c118b4fce0394ce433a0c50f94");
      setLatestMovies(response.data.results);
    }

    // const getTopRatedMovies = async () => {
    //   const response = await axios.get("https://api.themoviedb.org/3/movie/top_rated?api_key=2beb22c118b4fce0394ce433a0c50f94")
    //   setTopRatedMovies(response.data.results);
    // }

    // const getUpComingMovies = async () => {
    //   const response = await axios.get("https://api.themoviedb.org/3/movie/upcoming?api_key=2beb22c118b4fce0394ce433a0c50f94")
    //   setUpComingMovies(response.data.results);
    //   console.log("upcoming", response.data.results)
    // }
    
    const getSeries = async () => {
      const response = await axios.get("https://api.themoviedb.org/3/trending/tv/day?api_key=2beb22c118b4fce0394ce433a0c50f94");
      setSeries(response.data.results);
    }

    const getTvShows = async () => {
      const pages = 5;
      const tv_shows = [];
      for (let i = 1; i < pages; i++) {
        const response = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=2beb22c118b4fce0394ce433a0c50f94&language=en-US&page=${i}`);
        // setTvShows(response.data.results);
        response.data.results.forEach(item => {
            if(!item['origin_country'].includes('US')){
              tv_shows.push(item)
            }
          })  
      }
      setTvShows(tv_shows);
    }
    
    useEffect(() => { 
      getSliderImage();
      getSeries();
      getTvShows();
      getLatestMovies();
      // getTopRatedMovies();
      // getUpComingMovies();
    }, []);

  return (
    <div className='main-container'>
      <Navbar />
      <Slider sliderImage={sliderImage} />
      {/* <MainSlider itemName="upcoming movies" items={upComingMovies} /> */}
      <MainSlider itemName="latest movies" items={latestMovies} />
      {/* <MainSlider itemName="top rated movies" items={topRatedMovies} /> */}
      <MainSlider itemName="latest series" items={series} />
      <MainSlider itemName="latest tv shows" items={tvShows} />
      <Footer/>
    </div>
  )
}

export default Main

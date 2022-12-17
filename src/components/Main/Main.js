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

     // Variables for API
     const baseUrl = "https://api.themoviedb.org/3";
     const apiKey = process.env.REACT_APP_TMDB_API_KEY;
     const language = "en-US";

    // Get Slider Images
    const getSliderImage = async () => {
        const response = await axios.get(`${baseUrl}/movie/now_playing?api_key=${apiKey}`);  
        setSliderImage(response.data.results);
    }

    // Get Latest Movies
    const getLatestMovies = async () => {
      const response = await axios.get(`${baseUrl}/movie/popular?api_key=${apiKey}`);
      setLatestMovies(response.data.results);
    }
    
    // Get Series
    const getSeries = async () => {
      const response = await axios.get(`${baseUrl}/trending/tv/day?api_key=${apiKey}`);
      setSeries(response.data.results);
    }

    // Get Tv Shows
    const getTvShows = async () => {
      const pages = 5;
      const tv_shows = [];
      for (let i = 1; i < pages; i++) {
        const response = await axios.get(`${baseUrl}/tv/popular?api_key=${apiKey}&language=${language}&page=${i}`);
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
    }, []);

  return (
    <div className='main-container'>
      <Navbar />
      <Slider sliderImage={sliderImage} />
      <MainSlider itemName="latest movies" items={latestMovies} />
      <MainSlider itemName="latest series" items={series} />
      <MainSlider itemName="latest tv shows" items={tvShows} />
      <Footer/>
    </div>
  )
}

export default Main

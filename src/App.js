import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Movies from './components/Movies/Movies';
import Series from './components/Series/Series';
import TvShows from './components/TvShows/TvShows';
import Main from './components/Main/Main';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieDetails from './components/MovieDeatils/MovieDetails';
import SeriesDetails from './components/SeriesDetails/SeriesDetails';
import Episode from './components/Episodes/Episode';
import ActorDetails from './components/ActorDetails/ActorDetails';

function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([])
  const [series, setSeries] = useState([])
  const [tvShows, setTvShows] = useState([])
  const [searchTerm, setSearchTerm] = React.useState('');
  const baseUrl = "https://api.themoviedb.org/3";
  const apiKey = "2beb22c118b4fce0394ce433a0c50f94";
  const language = "en-US";
  let page = 1;
  console.log(page)

  const getMovies = async (pageNo, searchTerm) => {
    setLoading(true);
    if(searchTerm === undefined || searchTerm === ''){
      if (pageNo === 1) {
        const response = await axios.get(`${baseUrl}/movie/popular?api_key=${apiKey}&language=${language}&page=${pageNo}`);
        const movies = response.data.results;
        setMovies(movies);
        setLoading(false);
        return;
      }
      const response = await axios.get(`${baseUrl}/movie/popular?api_key=${apiKey}&language=${language}&page=${pageNo}`);
      const moreMovies = response.data.results;
  
      setTimeout(() => {
        setMovies((prevMovies) => {
          return [...prevMovies, ...moreMovies];
        });
        setLoading(false);
      }, 4000);
    }
    else{
      setMovies([]);
      setLoading(true);
      const response = await axios.get(`${baseUrl}/search/movie?api_key=${apiKey}&language
      =${language}&query=${searchTerm}&page=${pageNo}`);
      const movies = response.data.results;
      for(let i = 2; i <= 50; i++){
        const response = await axios.get(`${baseUrl}/search/movie?api_key=${apiKey}&language
        =${language}&query=${searchTerm}&page=${i}`);
        movies.push(...response.data.results);
      }
      console.log(movies);
      setTimeout(() => {
        setMovies(movies);
        setLoading(false);
      }, 1000);
    }
  }

  const getSeries = async (pageNo) => {
    setLoading(true);
    if(searchTerm === undefined || searchTerm === ''){
      if (pageNo === 1) {
        const response = await axios.get(`${baseUrl}/trending/tv/day?api_key=${apiKey}&language=${language}&page=${pageNo}`);
        const series = response.data.results;
        setSeries(series);
        setLoading(false);
        return;
      }
      const response = await axios.get(`${baseUrl}/trending/tv/day?api_key=${apiKey}&language=${language}&page=${pageNo}`);
      const moreSeries = response.data.results;
  
      setTimeout(() => {
        setSeries((prevSeries) => {
          return [...prevSeries, ...moreSeries];
        });
        setLoading(false);
      }, 4000);
    }
    else{
      setSeries([]);
      setLoading(true);
      const response = await axios.get(`${baseUrl}/search/tv?api_key=${apiKey}&language
      =${language}&query=${searchTerm}&page=${pageNo}`);
      const series = response.data.results;
      for(let i = 2; i <= 50; i++){
        const response = await axios.get(`${baseUrl}/search/tv?api_key=${apiKey}&language
        =${language}&query=${searchTerm}&page=${i}`);
        series.push(...response.data.results);
      }
      console.log(series);
      setTimeout(() => {
        setSeries(series);
        setLoading(false);
      }
      , 1000);
    }
  }

  const getTvShows = async (pageNo) => {
    setLoading(true);
    if(searchTerm === undefined || searchTerm === ''){
      console.log("I'm here")
      if (pageNo === 1) {
        const response = await axios.get(`${baseUrl}/tv/popular?api_key=${apiKey}&language
        =${language}&page=${pageNo}`);
        const tvShows = response.data.results;
        setTvShows(tvShows);
        setLoading(false);
        return;
      }
      const response = await axios.get(`${baseUrl}/tv/popular?api_key=${apiKey}&language
      =${language}&page=${pageNo}`);
      const moreTvShows = response.data.results;
      setTimeout(() => {
        setTvShows((prevtvShows) => {
          return [...prevtvShows, ...moreTvShows];
        });
        setLoading(false);
      }, 1000);
    }
    else{
      setTvShows([]);
      setLoading(true);
      const response = await axios.get(`${baseUrl}/search/tv?api_key=${apiKey}&language
      =${language}&query=${searchTerm}&page=${pageNo}`);
      const tvShows = response.data.results;
      for(let i = 2; i <= 50; i++){
        const response = await axios.get(`${baseUrl}/search/tv?api_key=${apiKey}&language
        =${language}&query=${searchTerm}&page=${i}`);
        tvShows.push(...response.data.results);
      }
      console.log(tvShows);
      setTimeout(() => {
        setTvShows(tvShows);
        setLoading(false);
      }
      , 1000);
    }
  }

  useEffect(() => {
    getMovies(page);
    getSeries(page);
    getTvShows(page);
    // eslint-disable-next-line 
  }, [page]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/movies"
            element={
              <Movies
                itemName="movies"
                items={movies}
                getMovies={getMovies}
                page={page}
                loading={loading}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            }
          />
          <Route
            path="/series"
            element={
              <Series
                itemName="series"
                items={series}
                getSeries={getSeries}
                page={page}
                loading={loading}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            }
          />
          <Route
            path="/tv-shows"
            element={
              <TvShows
                itemName="tv shows"
                items={tvShows}
                getTvShows={getTvShows}
                page={page}
                loading={loading}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            }
          />

          <Route path='/movie-details/:id' element={<MovieDetails/>} />
          <Route path='/series-details/:id' element={<SeriesDetails/>} />
          <Route path="/:tv_id/episodes/:id" element={<Episode/>} />
          <Route path="/actor-details/:id" element={<ActorDetails/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

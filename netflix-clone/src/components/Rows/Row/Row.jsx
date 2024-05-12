import React, { useEffect, useState, useRef } from 'react';
import "./Row.css";
import axios from "../../../utils/axios";
import movieTrailer from 'movie-trailer';
import YouTube from 'react-youtube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovie] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    const rowRef = useRef(null);

    const base_url = "https://image.tmdb.org/t/p/original";

    useEffect(() => {
        async function fetchData() {
            try {
                const request = await axios.get(fetchUrl);
                setMovie(request.data.results);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, [fetchUrl]);

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.title || movie?.name || movie?.original_name)
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                })
                .catch((error) => console.error(error));
        }
    };

    const opts = {
        height: '390',
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    const handleScroll = (direction) => {
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <div className="row">
            <h2>{title}</h2>
            <button className="row__arrow row__arrowLeft" onClick={() => handleScroll('left')}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <div className="row__posters" ref={rowRef}>
    {movies.map((movie, index) => (
        <div key={index} className="row__posterContainer">
            <img
                className={`row__poster ${isLargeRow ? "row__posterLarge" : ""}`}
                onClick={() => handleClick(movie)}
                src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                alt={movie.name}
            />
            <div className="row__posterTitle">{movie.name}</div>
        </div>
    ))}
</div>

            <button className="row__arrow row__arrowRight" onClick={() => handleScroll('right')}>
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
            {trailerUrl && (
                <YouTube videoId={trailerUrl} opts={opts} />
            )}
        </div>
    );
}

export default Row;

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from '../../components/not-found/not-found';
import Videoplayer from '../../components/videoplayer/videoplayer';
import { useAppSelector } from '../../hooks';
import { Film } from '../../types/film';


function Player(): JSX.Element {

  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const { films } = useAppSelector((state) => state);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { id } = useParams();

  const selectedFilm: Film | undefined = films.find((film) => String(film.id) === id);


  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }

    videoRef.current?.addEventListener('loadeddata', () => setIsLoading(false));
  });
  if (!selectedFilm) {
    return <NotFound />;
  } else {
    return (
      <div className="player">
        <Videoplayer film={selectedFilm} isPlaying={isPlaying}/>
        <button type="button" className="player__exit">Exit</button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value="30" max="100"></progress>
              <div className="player__toggler" style={{ left: '30%' }}>Toggler</div>
            </div>
            <div className="player__time-value">1:30:29</div>
          </div>

          <div className="player__controls-row">
            <button type="button" className={`player__${isPlaying ? 'pause' : 'play'}`} disabled={isLoading} onClick={() => setIsPlaying(!isPlaying)}>
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"></use>
              </svg>
              <span>Play</span>
            </button>
            <div className="player__name">Transpotting</div>

            <button type="button" className="player__full-screen">
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"></use>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Player;

import { useEffect, useRef, useState } from 'react';
import PlayerContext from './PlayerContext';
import axios from 'axios';

const PlayerProvider = ({ children }) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const url = 'http://localhost:3000/api';

  const [track, setTrack] = useState();
  const [playStatus, setPlayStatus] = useState(false);

  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const updateTime = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', updateTime);
      audioRef.current.addEventListener('loadedmetadata', onLoadedMetadata);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', updateTime);
        audioRef.current.removeEventListener(
          'loadedmetadata',
          onLoadedMetadata
        );
      }
    };
  }, []);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setPlayStatus(true);
    }
  };

  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };

  const playWithId = async (id) => {
    setTrack(songs.find((song) => song._id === id));
  };

  const previous = () => {
    const currentIndex = songs.findIndex((song) => song._id === track._id);
    if (currentIndex > 0) setTrack(songs[currentIndex - 1]);
  };

  const next = () => {
    const currentIndex = songs.findIndex((song) => song._id === track._id);
    if (currentIndex < songs.length - 1) setTrack(songs[currentIndex + 1]);
  };

  const seekSong = (e) => {
    if (audioRef.current) {
      const { offsetX } = e.nativeEvent;
      const { offsetWidth } = seekBg.current;
      if (audioRef.current.duration) {
        audioRef.current.currentTime =
          (offsetX / offsetWidth) * audioRef.current.duration;
        updateSeekBar();
      }
    }
  };

  const updateSeekBar = () => {
    if (seekBar.current && audioRef.current) {
      const percentage =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      seekBar.current.style.width = `${percentage}%`;
    }
  };

  useEffect(() => {
    const updateInterval = setInterval(() => {
      updateSeekBar();
    }, 1000);
    return () => clearInterval(updateInterval);
  }, []);

  const getSongs = async () => {
    try {
      const { data } = await axios.get(`${url}/songs/list`);
      setSongs(data.data);
      setTrack(data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getAlbums = async () => {
    try {
      const { data } = await axios.get(`${url}/albums/list`);
      setAlbums(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSongs();
    getAlbums();
  }, []);

  useEffect(() => {
    if (track && audioRef.current) setPlayStatus(false);
  }, [track]);

  return (
    <PlayerContext.Provider
      value={{
        audioRef,
        seekBg,
        seekBar,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        play,
        pause,
        playWithId,
        previous,
        next,
        seekSong,
        songs,
        albums,
        currentTime,
        duration,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;

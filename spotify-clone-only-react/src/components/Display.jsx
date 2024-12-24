import { Route, Routes, useLocation } from 'react-router-dom';
import DisplayHome from './DisplayHome';
import DisplayAlbum from './DisplayAlbum';
import { useContext, useEffect, useRef } from 'react';
import PlayerContext from '../context/PlayerContext';

const Display = () => {
  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes('album');
  const albumId = isAlbum ? location.pathname.split('/').pop() : '';
  const { albums } = useContext(PlayerContext);
  const bgColor =
    isAlbum && albums.length > 0
      ? albums.find((album) => album._id === albumId).bgColor
      : '#121212';

  useEffect(() => {
    if (isAlbum)
      displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`;
    else displayRef.current.style.background = '#121212';
  });

  return (
    <div
      ref={displayRef}
      className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0"
    >
      {albums.length > 0 ? (
        <Routes>
          <Route path="/" element={<DisplayHome></DisplayHome>}></Route>
          <Route
            path="/album/:id"
            element={
              <DisplayAlbum
                album={albums.find((album) => album._id === albumId)}
              ></DisplayAlbum>
            }
          ></Route>
        </Routes>
      ) : null}
    </div>
  );
};

export default Display;
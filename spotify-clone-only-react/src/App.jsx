import { useContext } from 'react';
import Display from './components/Display';
import Player from './components/Player';
import Sidebar from './components/Sidebar';
import PlayerContext from './context/PlayerContext';

const App = () => {
  const { audioRef, track, songs } = useContext(PlayerContext);

  return (
    <div className="h-screen bg-black">
      {songs.length !== 0 ? (
        <>
          <div className="h-[90%] flex">
            <Sidebar></Sidebar>
            <Display></Display>
          </div>
          <Player></Player>
        </>
      ) : null}

      <audio
        ref={audioRef}
        src={track ? track.file : ''}
        preload="auto"
      ></audio>
    </div>
  );
};

export default App;

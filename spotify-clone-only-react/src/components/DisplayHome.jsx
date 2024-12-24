import Navbar from './Navbar';
import AlbumItem from './Albumitem';
import SongItem from './SongItem';
import { useContext } from 'react';
import PlayerContext from '../context/PlayerContext';

const DisplayHome = () => {
  const { songs, albums } = useContext(PlayerContext);

  return (
    <>
      <Navbar></Navbar>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        <div className="flex overflow-auto">
          {albums.map((item, index) => (
            <AlbumItem
              key={index}
              name={item.name}
              image={item.image}
              desc={item.desc}
              id={item._id}
            ></AlbumItem>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Today's biggest hits</h1>
        <div className="flex overflow-auto">
          {songs.map((item, index) => (
            <SongItem
              key={index}
              name={item.name}
              image={item.image}
              id={item._id}
              desc={item.desc}
            ></SongItem>
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;

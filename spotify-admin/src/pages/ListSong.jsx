import { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../App';
import { toast } from 'react-toastify';

const ListSong = () => {
  const [data, setData] = useState([]);

  const fetchSongs = async () => {
    try {
      const { data } = await axios.get(`${url}/songs/list`);

      if (data.success) setData(data.data);
    } catch (error) {
      toast.error('Error Occur');
    }
  };

  const removeSong = async (id) => {
    try {
      await axios.delete(`${url}/songs/${id}`);
      await fetchSongs();
    } catch (error) {
      toast.error('Error Occur');
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div>
      <p>All Songs List</p>
      <br />
      <div>
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Album</b>
          <b>Duration</b>
          <b>Action</b>
        </div>
        {data.map((song) => (
          <div
            key={song._id}
            className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5"
          >
            <img src={song.image} alt="" className="w-12" />
            <p>{song.name}</p>
            <p>{song.album}</p>
            <p>{song.duration}</p>
            <p onClick={() => removeSong(song._id)} className="cursor-pointer">
              x
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListSong;

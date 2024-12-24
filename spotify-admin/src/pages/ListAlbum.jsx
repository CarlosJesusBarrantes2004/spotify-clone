import { useEffect, useState } from 'react';
import { url } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';

const ListAlbum = () => {
  const [data, setData] = useState([]);

  const fetchAlbums = async () => {
    try {
      const { data } = await axios.get(`${url}/albums/list`);
      if (data.success) setData(data.data);
    } catch (error) {
      toast.error('Error Occur');
    }
  };

  const removeAlbum = async (id) => {
    try {
      await axios.delete(`${url}/albums/${id}`);
      await fetchAlbums();
    } catch (error) {
      toast.error('Error occur');
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div>
      <p>All Albums List</p>
      <br />
      <div>
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Album Color</b>
          <b>Action</b>
        </div>
        {data.map((album) => (
          <div
            key={album._id}
            className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5"
          >
            <img src={album.image} alt="" className="w-12" />
            <p>{album.name}</p>
            <p>{album.desc}</p>
            <input type="color" value={album.bgColor} />
            <p
              className="cursor-pointer"
              onClick={() => removeAlbum(album._id)}
            >
              x
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListAlbum;

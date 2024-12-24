import { useState } from 'react';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';
import { url } from '../App';

const AddAlbum = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('desc', desc);
      formData.append('bgColor', bgColor);
      formData.append('image', image);

      const { data } = await axios.post(`${url}/albums/add`, formData);

      if (data.success) {
        toast.success('Album added successfully');
        setName('');
        setDesc('');
        setImage(null);
        setBgColor('#ffffff');
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
    </div>
  ) : (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-start gap-8 text-gray-600"
    >
      <div className="flex flex-col gap-4">
        <p>Upload Image</p>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          id="image"
          type="file"
          accept="image/*"
          hidden
        />
        <label htmlFor="image">
          <img
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            alt=""
            className="w-24 cursor-pointer"
          />
        </label>
      </div>
      <div className="flex flex-col gap-2.5">
        <p>Album name</p>
        <input
          type="text"
          placeholder="Type here"
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <p>Album description</p>
        <input
          type="text"
          placeholder="Type here"
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
        />
      </div>
      <div className="flex flex-col gap-3">
        <p>Background Colour</p>
        <input
          type="color"
          onChange={(e) => setBgColor(e.target.value)}
          value={bgColor}
        />
      </div>
      <button
        type="submit"
        className="text-base bg-black text-white py-2.5 px-14 cursor-pointer"
      >
        ADD
      </button>
    </form>
  );
};

export default AddAlbum;

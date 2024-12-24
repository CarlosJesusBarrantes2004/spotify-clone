import Album from '../models/Album.js';
import { uploadFile } from '../config/cloudinary.js';

export const addAlbum = async (req, res, next) => {
  const { name, desc, bgColor } = req.body;

  try {
    let imageUpload = '';

    if (req.file) {
      if (!req.file.mimetype.startsWith('image/'))
        return res
          .status(400)
          .json({ success: false, message: 'Invalid image file type' });

      imageUpload = await uploadFile(req.file.buffer, 'image');
    }

    const albumData = {
      name,
      desc,
      bgColor,
      image: imageUpload.secure_url,
    };

    const album = await Album.create(albumData);

    res.status(201).json({ success: true, data: album });
  } catch (error) {
    console.log('Error in addAlbum:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const listAlbum = async (req, res, next) => {
  try {
    const albums = await Album.find();
    res.status(200).json({ success: true, data: albums });
  } catch (error) {
    console.log('Error in listAlbum:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeAlbum = async (req, res, next) => {
  const { id } = req.params;

  try {
    const album = await Album.findByIdAndDelete(id);

    if (!album)
      return res
        .status(404)
        .json({ success: false, message: 'Album not found' });

    res.status(204).send();
  } catch (error) {
    console.log('Error in removeAlbum:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

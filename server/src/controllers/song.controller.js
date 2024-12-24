import { uploadFile } from '../config/cloudinary.js';
import Song from '../models/Song.js';

export const addSong = async (req, res, next) => {
  const { name, desc, album } = req.body;

  try {
    let songUpload = '';
    let imageUpload = '';

    if (req.files) {
      if (req.files.song && !req.files.song[0].mimetype.startsWith('audio/'))
        return res
          .status(400)
          .json({ success: false, message: 'Invalid audio file type' });

      if (req.files.image && !req.files.image[0].mimetype.startsWith('image/'))
        return res
          .status(400)
          .json({ success: false, message: 'Invalid image file type' });

      songUpload = await uploadFile(req.files.song[0].buffer, 'audio');
      imageUpload = await uploadFile(req.files.image[0].buffer, 'image');
    }

    let formattedDuration = '0:00';

    if (songUpload && typeof songUpload.duration === 'number') {
      const duration = songUpload.duration;
      const minutes = Math.floor(duration / 60);
      const seconds = Math.floor(duration % 60);
      formattedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    const songData = {
      name,
      desc,
      album,
      duration: formattedDuration,
      file: songUpload.secure_url,
      image: imageUpload.secure_url,
    };

    const song = await Song.create(songData);

    res.status(201).json({ success: true, data: song });
  } catch (error) {
    console.log('Error in addSong:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const listSong = async (req, res, next) => {
  try {
    const songs = await Song.find();
    res.status(200).json({ success: true, data: songs });
  } catch (error) {
    console.log('Error in listSong:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeSong = async (req, res, next) => {
  const { id } = req.params;

  try {
    const song = await Song.findByIdAndDelete(id);

    if (!song)
      return res
        .status(404)
        .json({ success: false, message: 'Song not found' });

    res.status(204).send();
  } catch (error) {
    console.log('Error in removeSong:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

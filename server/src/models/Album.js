import mongoose from 'mongoose';

const AlbumSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    desc: { type: String, required: true },
    bgColor: { type: String, required: true },
    image: { type: String, required: true },
    //songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
  },
  { timestamps: true }
);

export default mongoose.model('Album', AlbumSchema);

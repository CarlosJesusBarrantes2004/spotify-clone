import { Router } from 'express';
import {
  addSong,
  listSong,
  removeSong,
} from '../controllers/song.controller.js';
import upload from '../middlewares/multer.js';

const router = Router();

router.post(
  '/add',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'song', maxCount: 1 },
  ]),
  addSong
);
router.get('/list', listSong);
router.delete('/:id', removeSong);

export default router;

import { Router } from 'express';
import {
  addAlbum,
  listAlbum,
  removeAlbum,
} from '../controllers/album.controller.js';
import upload from '../middlewares/multer.js';

const router = Router();

router.post('/add', upload.single('image'), addAlbum);
router.get('/list', listAlbum);
router.delete('/:id', removeAlbum);

export default router;

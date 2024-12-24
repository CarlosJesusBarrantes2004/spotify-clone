import { Router } from 'express';
import songRouter from './song.route.js';
import albumRouter from './album.route.js';

const router = Router();

router.use('/songs', songRouter);
router.use('/albums', albumRouter);

export default router;

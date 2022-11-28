import { Router } from 'express';
import User from './user.router';

const router = Router();

router.use('/login', User);

export default router;

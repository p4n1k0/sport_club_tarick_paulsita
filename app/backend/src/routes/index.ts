import { Router } from 'express';
import User from './user.router';
import Team from './team.router';

const router = Router();

router.use('/login', User);
router.use('/teams', Team);

export default router;

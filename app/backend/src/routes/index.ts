import { Router } from 'express';
import User from './user.router';
import Team from './team.router';
import Match from './match.router';

const router = Router();

router.use('/login', User);
router.use('/teams', Team);
router.use('/matches', Match);

export default router;

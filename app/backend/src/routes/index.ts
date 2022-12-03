import { Router } from 'express';
import User from './user.router';
import Team from './team.router';
import Match from './match.router';
import Leaderboard from './leaderboard.router';

const router = Router();

router.use('/login', User);
router.use('/teams', Team);
router.use('/matches', Match);
router.use('/leaderboard', Leaderboard);

export default router;

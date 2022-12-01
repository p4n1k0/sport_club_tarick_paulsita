import { Router } from 'express';
import MatchController from '../controllers/match.controller';

const router = Router();

const matcheController = new MatchController();

router.get('/', (req, res) => matcheController.getAll(req, res));

export default router;

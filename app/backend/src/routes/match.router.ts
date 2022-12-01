import { Router } from 'express';
import MatchController from '../controllers/match.controller';

const router = Router();

const matcheController = new MatchController();

router.get('/', (req, res) => matcheController.getAllInProgress(req, res));
router.post('/', (req, res) => matcheController.create(req, res));

export default router;

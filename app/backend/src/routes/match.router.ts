import { Router } from 'express';
import MatchController from '../controllers/match.controller';

const router = Router();

const matcheController = new MatchController();

router.get('/', (req, res) => matcheController.getInProgress(req, res));
router.post('/', (req, res) => matcheController.create(req, res));
router.patch('/:id/finish', (req, res) => matcheController.update(req, res));

export default router;

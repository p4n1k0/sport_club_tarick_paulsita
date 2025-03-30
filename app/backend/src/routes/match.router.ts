import { Router } from 'express';
import MatchController from '../controllers/match.controller';
import tokenValidate from '../utils/decodeToken';

const router = Router();

const matcheController = new MatchController();

router.get('/matches', (req, res) => matcheController.getInProgress(req, res));
router.post('/matches', tokenValidate, matcheController.create.bind(matcheController));
router.patch('/matches/:id/finish', (req, res) => matcheController.update(req, res));
router.patch('/matches/:id', (req, res) => matcheController.updateMatch(req, res));

export default router;
